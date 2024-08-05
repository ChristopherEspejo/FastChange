import { Component, ViewChild } from '@angular/core';
import { UserService } from "../../user.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { Bank, CompanyBank } from "../../interfaces/BankInterface";
import { BankDialogComponent } from "../../components/bank-dialog/bank-dialog.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  selectedFastChangeAccount: CompanyBank | null | undefined = null;
  useCci: boolean = false;
  toggleValue = false;
  changeValue = "tipoCompra";
  changeTypeAmount = 0;
  changeType = { tipoCompra: 0, tipoVenta: 0 };
  step = 1;
  accountNumber!: string;
  accountType!: string;
  cantidadEnvio: number = 100;
  transactionDetails: any = {};
  responseTransaction: any;
  numeroOperacion: any;
  banksList: Bank[] = [];
  companyBanksList: CompanyBank[] = [];
  banksLoading: boolean = true;
  isProcessing: boolean = false; // Nueva propiedad para el estado de carga
  selectedBank?: Bank | null;
  @ViewChild('accNum') accNum: any;

  constructor(private userService: UserService,
              private toaste: ToastrService,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadChangeType();
    this.loadBanks();
    this.loadCompanyBanks();
  }

  setStep(step: number): void {
    this.step = step;
  }

  cancelProcess(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Estás seguro de que quieres cancelar esta transacción?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.cancelTransaction(this.responseTransaction._id).subscribe({
          next: (data) => {
            console.log('Transaction canceled successfully:', data);
            this.toaste.warning('Transacción cancelada');
            this.setStep(1);
          },
          error: (err) => {
            console.error('Error canceling transaction:', err);
            this.toaste.error('Error cancelando transacción');
          },
          complete: () => {
            this.selectedBank = null;
            this.accountNumber = '';
            this.accountType = '';
            this.selectedFastChangeAccount = null;
            this.changeValue = 'tipoCompra';
          }
        });
      }
    });
  }

  loadBanks(): void {
    this.userService.getAllBanks().subscribe({
      next: (data: Bank[]) => {
        this.banksList = data;
        this.banksLoading = false;
      },
      error: (err) => {
        console.error('Error fetching banks:', err);
        this.toaste.error('Error al cargar los bancos');
        this.banksLoading = false;
      }
    });
  }

  loadCompanyBanks(): void {
    this.userService.getAllCompanyBanks().subscribe({
      next: (data: CompanyBank[]) => {
        this.companyBanksList = data;
      },
      error: (err) => {
        console.error('Error fetching company banks:', err);
        this.toaste.error('Error al cargar los bancos de la compañía');
      }
    });
  }

  loadChangeType(): void {
    this.userService.getChangeType().subscribe({
      next: (data) => this.changeType = data,
      error: (err) => console.error('Error fetching change type:', err)
    });
  }

  toggleCurrency() {
    this.toggleValue = !this.toggleValue;
    this.changeValue = this.toggleValue ? "tipoVenta" : "tipoCompra";
  }

  submitForm(): void {
    if (!this.accNum.valid || !this.accountType || !this.cantidadEnvio || !this.cantidadEnvio.toString().match(/^\d+(\.\d{1,3})?$/)) {
      this.toaste.error('Por favor, corrija los errores o complete los campos antes de continuar.');
      return;
    }
    this.isProcessing = true; // Activar el estado de carga
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Estás seguro de que deseas enviar este formulario?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.accountNumber && this.accountType && this.cantidadEnvio && this.selectedBank) {
          console.log(this.accountNumber, this.accountType, this.cantidadEnvio, this.changeValue);
          this.changeTypeAmount = this.changeValue === 'tipoCompra' ? this.changeType.tipoCompra : this.changeType.tipoVenta;
          this.userService.verifyChangeType({
            tipoCambio: this.changeTypeAmount,
            tipoOperacion: this.changeValue
          }).subscribe({
            next: (data) => {
              console.log('Change type updated successfully:', data);
              if (data.hasChanged) {
                this.toaste.warning('La tasa de cambio ha cambiado en los últimos 5 minutos, revisa nuevamente antes de continuar');
                this.changeType.tipoVenta = data.currentChangeType.tipoVenta;
                this.changeType.tipoCompra = data.currentChangeType.tipoCompra;
                this.isProcessing = false; // Desactivar el estado de carga si hubo un cambio en la tasa
              } else {
                this.userService.createTransaction({
                  tipoOperacion: this.changeValue,
                  cantidadEnvio: this.cantidadEnvio,
                  numeroCuentaInterbancario: this.accountNumber,
                  tipoCuenta: this.accountType,
                  bancoDestino: this.selectedBank!.name,
                }).subscribe(
                  {
                    next: (data) => {
                      this.responseTransaction = data;
                      this.toaste.success('Transacción creada exitosamente');
                      this.setStep(2);
                      this.setFastChangeAccount();
                      this.isProcessing = false; // Desactivar el estado de carga después de completar la transacción
                    },
                    error: (err) => {
                      console.error('Error creating transaction:', err);
                      this.toaste.error('Error creando transacción');
                      this.isProcessing = false; // Desactivar el estado de carga en caso de error
                    }
                  }
                )
              }
            },
            error: (err) => {
              console.error('Error updating change type:', err);
              this.toaste.error('Error en la verificación de moneda');
              this.isProcessing = false; // Desactivar el estado de carga en caso de error
            }
          })
        } else {
          this.toaste.error('Por favor, completa todos los campos');
          this.isProcessing = false; // Desactivar el estado de carga si hay errores de validación
        }
      } else {
        this.isProcessing = false; // Desactivar el estado de carga si se cancela la operación
      }
    });
  }

  confirmPayment(): void {
    if (!this.numeroOperacion || isNaN(this.numeroOperacion)) {
      this.toaste.error('Por favor, introduce un número de operación válido.');
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Estás seguro de que quieres confirmar este pago?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateTransaction(this.responseTransaction._id, this.numeroOperacion).subscribe({
          next: (data) => {
            console.log('Transaction updated successfully:', data);
            this.toaste.success('La operación está siendo revisada, gracias por confiar en nosotros, lo atenderemos pronto');
            this.router.navigate(['/user/history']);
          },
          error: (err) => {
            console.error('Error updating transaction:', err);
            this.toaste.error('Error actualizando transacción');
          }
        });
      }
    });
  }

  openBankDialog(): void {
    if (!this.banksLoading) {
      const dialogRef = this.dialog.open(BankDialogComponent, {
        width: '450px',
        data: { banks: this.banksList },
      });

      dialogRef.afterClosed().subscribe((selectedBank: Bank) => {
        if (selectedBank) {
          this.selectedBank = selectedBank;
          this.accountNumber = '';
          this.updateSelectedFastChangeAccount();
        }
      });
    } else {
      this.toaste.warning('Esperando la carga de bancos. Por favor, espera un momento.');
    }
  }

  updateSelectedFastChangeAccount() {
    if (this.selectedBank) {
      const targetCurrency = this.changeValue === 'tipoCompra' ? 'PEN' : 'USD';
      this.selectedFastChangeAccount = this.companyBanksList.find(account =>
        account.bankName === this.selectedBank!.name && account.currency === targetCurrency
      );
      this.useCci = this.selectedBank!.cci;

      console.log("Selected FastChange Account:", this.selectedFastChangeAccount);
    } else {
      this.selectedFastChangeAccount = null;
    }
  }

  setFastChangeAccount() {
    if (this.selectedBank && this.selectedBank.cci === false) {
      this.selectedFastChangeAccount = this.companyBanksList.find(account =>
        account.bankName === this.selectedBank!.name &&
        account.currency === (this.changeValue === 'tipoCompra' ? 'PEN' : 'USD')
      );
    } else {
      this.selectedFastChangeAccount = this.companyBanksList.find(account =>
        account.pk === (this.changeValue === 'tipoCompra' ? 2 : 1)
      );
      this.useCci = true;
    }
  }

  getAccountInfo(account: CompanyBank): string {
    return `${account.accountType} - ${account.currency}`;
  }
}
