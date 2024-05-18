import {Component, ViewChild} from '@angular/core';
import {UserService} from "../../user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {banks, Bank} from "../../interfaces/BankInterface";
import {BankDialogComponent} from "../../components/bank-dialog/bank-dialog.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  selectedFastChangeAccount: any = null;
  fastChangeAccounts = [
    {
      bank: 'Interbank',
      accountType: 'ahorro',
      accountName: 'FastChange Ahorro USD',
      accountNumber: '5555555555555',
      currencyType: 'USD',
      accountInfo: 'Ahorro - Dólares'
    },
    {
      bank: 'Interbank',
      accountType: 'corriente',
      accountName: 'FastChange Ahorro PEN',
      accountNumber: '4214242424242',
      currencyType: 'PEN',
      accountInfo: 'Corriente - PEN'
    },
    {
      bank: 'BCP',
      accountType: 'corriente',
      accountName: 'FastChange Corriente',
      accountNumber: '1234567890123',
      currencyType: 'PEN',
      accountInfo: 'Ahorro - Soles'
    },
    // Añade más cuentas según necesites
  ];

  toggleValue = false;
  changeValue = "tipoCompra"
  changeTypeAmount = 0;
  changeType = {tipoCompra: 0, tipoVenta: 0};
  step = 1;
  accountNumber!: string;
  accountType!: string;
  cantidadEnvio: number = 100;
  transactionDetails: any = {};
  responseTransaction: any;
  numeroOperacion: any;
  banksList = banks
  selectedBank?: Bank| null;
  @ViewChild('accNum') accNum: any;

  constructor(private userService: UserService,
              private toaste: ToastrService,
              private router: Router,
              private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.loadChangeType();
  }

  setStep(step: number): void {
    this.step = step;
  }

  cancelProcess(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {message: '¿Estás seguro de que quieres cancelar esta transacción?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó la acción
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
            this.accountType = ''; // Asegúrate de restablecer también el tipo de cuenta
            this.selectedFastChangeAccount = null; // Restablece la cuenta de FastChange seleccionada
            this.changeValue = 'tipoCompra'; // Restablece a valor por defecto si necesario
          }

        });
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
    if (!this.accNum.valid || !this.accountType || !this.cantidadEnvio || !this.cantidadEnvio.toString().match(/^\d+(\.\d{1,3})?$/) ){
      this.toaste.error('Por favor, corrija los errores o complete los campos antes de continuar.');
      return; // No continuar con el envío si hay errores
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {message: '¿Estás seguro de que deseas enviar este formulario?'}
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
                    },
                    error: (err) => {
                      console.error('Error creating transaction:', err);
                      this.toaste.error('Error creando transacción');
                    }
                  }
                )

              }

            },
            error: (err) => {
              console.error('Error updating change type:', err);
              this.toaste.error('Error en la verificación de moneda');
            }
          })
        } else {
          this.toaste.error('Por favor, completa todos los campos');
        }
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
      data: {message: '¿Estás seguro de que quieres confirmar este pago?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para confirmar el pago después de la confirmación del usuario
        this.userService.updateTransaction(this.responseTransaction._id, this.numeroOperacion).subscribe({
          next: (data) => {
            console.log('Transaction updated successfully:', data);
            this.toaste.success('Envío exitoso, gracias por confiar en nosotros, lo atenderemos pronto');
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
    const dialogRef = this.dialog.open(BankDialogComponent, {
      width: '450px',
      data: {banks: this.banksList},
    });

    // En el componente padre TypeScript
    dialogRef.afterClosed().subscribe((selectedBank: Bank) => {
      if (selectedBank) {
        this.selectedBank = selectedBank;
        this.accountNumber = '';
        this.updateSelectedFastChangeAccount()
      }
    });
  }
  updateSelectedFastChangeAccount() {
    if (this.selectedBank) {
      // Define la moneda objetivo basada en el tipo de operación
      const targetCurrency = this.changeValue === 'tipoCompra' ? 'PEN' : 'USD';

      // Filtra para encontrar la cuenta correspondiente que coincida tanto con el banco como con la moneda
      this.selectedFastChangeAccount = this.fastChangeAccounts.find(account =>
        account.bank === this.selectedBank!.name && account.currencyType === targetCurrency
      );

      console.log("Selected FastChange Account:", this.selectedFastChangeAccount);
    } else {
      this.selectedFastChangeAccount = null;
    }
  }



}
