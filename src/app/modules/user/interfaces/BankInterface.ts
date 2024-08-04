export interface Bank {
  pk: number;
  name: string;
  cci: boolean;
  short_name: string;
  long_name: string;
  image?: string;  // `image` es opcional según el esquema de Mongoose
  num_chars_min: number;
  num_chars_max: number;
  format_mask?: string | null;  // Puede ser `string` o `null`
  supports_op_code: boolean;
  is_source_bank: boolean;
  is_target_bank: boolean;
  allow_credit_card: boolean;
}
export interface CompanyBank {
  pk: number;
  accountName: string;
  accountType: string;
  currency: string;
  bankName: string;
  accountNumber: string;
  cci: string;  // Según el esquema de Mongoose, `cci` es de tipo `String`
}



export const banks: Bank[] = [
  {
    "pk": 2,
    "name": "BCP",
    "cci": false,
    "short_name": "BCP",
    "long_name": "BCP",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAtFBMVEUAAAD2lWzzcC3zcjH0dzn0ej3zcC3zcS/zcjHzczL0eDv0eTz0f0bzcC7zcC7zczMPU5H0fkT0ej70gEf1hU/1gEn1ilgxU30ETI0ETI0IT48KUI/zczINUZAKUI/zczMOUpAPVJL0dzjzdTfzdTXvdTr0eDwWV5MhXZcYWJR7a3QpY5sgXpf0f0YdW5Z1bIIiXJU9cKL1gk3zbywASowLTImjYk0gT4EqUX5QVm5bWGrsbi/quod1AAAAM3RSTlMABP3KjFH77NO3Y1ki9vGxej4sGxUPDfLm28vKvbqtopaRfn13dEhDPTgzMisqIBkNCwlsHWRqAAAAu0lEQVQoz2WQVRaDMBAAgxaKQ0vd3WVTave/V4skZGE+Z5K3+5ZwNjP/Qupcx5TSzkqq+tuApiSKXQlTmvEGd438geY8AfSmGI6jPDwAQEaFbPssgK4RhP8PL0hxQlx2XfqBDIVgzr0EcoJK2X+LsKwEFQpU7EOdBbxxbDDvtEQvmcBYiP7ucT8Ubxwp3BttwVsN7hVhwMkEjlm+tycy17IqkTK43DfwYS32w4sIRstGGxqpEVvqPJCQ+gHtfyoYbB1SXwAAAABJRU5ErkJggg==",
    "num_chars_min": 13,
    "num_chars_max": 14,
    "format_mask": null,
    "supports_op_code": true,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": true
  },
  {
    "pk": 3,
    "name": "Interbank",
    "cci": false,
    "short_name": "Interbank",
    "long_name": "Interbank",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAATlBMVEUrpVsur2EpnlcqoVkvsmMtrF88S5ssqF0tql4pnFYwtWQomlU6WJMomFQ3ZYg4ZYs3Yoo6U5U2aoQwlms7UJc5W5E1dn4xhnE0ensskGIuhxRkAAAAr0lEQVQoz23Q0RKCIBCF4UVCLJVS0ur9XzTOWVGY4Vx+/ziuyoO7YcYY59wweO9FpPYjSA4Nl8JN4VbazlD78UAK9LhNeSs8BT3o2Z8L9E7oGqawf94pWAY4whI9Xrz0gY5gGCYehABHgDsEuIYOgV4F+l3gDHAGOoLTkNxGXAXPYUhXfddNv4M+Cj2FcyvCOArd76+88IMjlH9OD7pCw2cp3V4+S9sRWo5Qv1gd+wNObQ3YAq6NhQAAAABJRU5ErkJggg==",
    "num_chars_min": 13,
    "num_chars_max": 13,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": true
  },
  {
    "pk": 35,
    "name": "Banco Pichincha",
    "cci": false,
    "short_name": "Banco Pichincha",
    "long_name": "Banco Pichincha",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAXVBMVEX/3QD/4wD+3AD/4QAAAAD/4gD+3QD/3AD/5gD/4QD+5AD/4wD+3gD/6gD+3AD/3AD/3QAOJF0QJlyJgy3OuhPYww8UKVozQE7/4QAKIV4tPFE5RU3exwzqzgjUvhDwE0oqAAAAD3RSTlMe7zD4APMuBejko3QS3yrHJYHIAAAAdklEQVQoz53NSQ6AIBBEUUTAWdsZx/sfU5QYg90kxr+stygWMSozqzggKhjjYUUUuAA2BFtr297QT/VVh6E5w7COyzJawOf9gMD2HZ6fed4pAK013ID6CcoHeeIBkYIHuPSAyIAGIxJoEDxNZOgUG7jKS+6kogPW/BpEPrDDIQAAAABJRU5ErkJggg==",
    "num_chars_min": 12,
    "num_chars_max": 12,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 38,
    "name": "BanBif",
    "cci": false,
    "short_name": "BanBif",
    "long_name": "BanBif",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAnFBMVEUeickeickeicm22e2AveCy1+uw1esvks0njcr8/v7B3u9TpdX2+vvf7vWo0eiYyeWUx+SGweOJwuJ4uN5us9xbqdfv9vrp8/jZ6/TW6fLQ5vLF4O+52+6k0Oiezuicy+aKw+Nnr9hfrNdYqNZPo9Q+mtE6l881ls7t9PjK4/Kq0umgzul0ttxws9tosNorkMxXoptbpJhVoI9co4qRD6O7AAAAAnRSTlP37x3bRasAAACVSURBVCjP1dLJDoIwEAZgpHShhbZQyqaA7O7r+7+bVjnizcT432a+ZA6T31pYczFrezbW30GLUIWn8YzQjt3uDHVPcJbtNiAjIZiMg6tlfr0Ajg2kwj/RLA69dFO7gsKySLLBQH6gMumrtYdB6Crpl8Eqsl+nGCz8iL6BqXg/gQaA9wqKhhNHQwDrY+N0P3/J1+BjfR6GdQxY3U8evwAAAABJRU5ErkJggg==",
    "num_chars_min": 10,
    "num_chars_max": 10,
    "format_mask": null,
    "supports_op_code": true,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 11,
    "name": "BBVA",
    "cci": true,
    "short_name": "BBVA",
    "long_name": "BBVA",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABYlBMVEUAAAAXca9IdqE9Wn8LJE0IRocfV5A/eKgMQXkIaKoWUY0WUY0VPnAcVY8XPm8cdK8gR3YmeLBJj7tPZoUKNGkWLlUWUY0YQHISO24PbKwXca4YU44XL1YTb6wdda8eV5AbMlcWca0tf7UobaQsYZYwTXMhN1s0aJo2aJs0ZpovgLUyR2cvU31RkrwBQoQAZKgBLmUAG0YDQ4UpfLQDZqn8/v0FZ6kCJVbk7/QKSIgCPHajutASbq0NbKw0Z5oCV5geV5Hn7vLZ6PDD2+jP2+Y0g7cxgLYgdrEBVJgBVJcZU47w9PfJ1+K/0N+Kt9WpvtOUr8lamsVMkcFGjbxFjbt1mLo6h7otfrUjebNaha5PgK4KaaswcqdHdKMoXpVFV3QHM2gmPWHx9/ny9vi30+Sqy+Ghxd26zNxxqM2BocB8nb52mbs+ibpkjLMQX5sqYJYuXIsTToseTYA1UHYCOHQqR2/2zeXOAAAALnRSTlMA/jAq/vuLLP37+8/Lv7eJiWwwMPv6+fnz8c/Pz8u/v7y4j4+Pj4t3dnRzcm4yGEGL+AAAAVVJREFUKM9lj9V2wkAQQAeKW5G6uzcLIYSgxd3doe7e/n+zSSA59D7sw71nd2ZBQK7S60hSp1fJQYrcSBICpFEt+kMlIUF5NPa7xBR7vD9B6elyjL1Vi1BqKijxnA2E/pdNgHMK0clkIBUKZTwZgsiQIQ/eTQ6zCDldBcbPFGN114DMvbt8+IoKVnDwR2mm4wvG6sHSc+kaX1kFGR/KTKXge8o/9u8/sx02LACFA313y1TK2YErFwrnw0U8hAtXN5FGJBp5SMd87VeiHfYQP25YRmyRsQfdpbmfeghS43bMwzpCSX830YzXEvFGqxcM9r9+Lx2ONbyuzNl01mTVxEurGu99fA+HbDgAKzskQAcoRAVoinrzuhUKB4sNYBtNuPDa7XY39lsAoNZKNV8UM8BiEfW4nALHDq9F9kHAopHquTOYMGMSvYl7X0xmw9JotGgw2wTxB+CBYVsFb9amAAAAAElFTkSuQmCC",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": true
  },
  {
    "pk": 9,
    "name": "Scotiabank",
    "cci": true,
    "short_name": "Scotiabank",
    "long_name": "Scotiabank",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAllBMVEUAAADYHwbWIAjTIgrBJxbUIAfXHwbOJQ/XIwvVIAjTIgvRIw3XHwbXHwbXHwbPJQ7RJA7XHwbWHwfWHwfVIAnWIAjVIQnUIgrUIQrQJA3OJxDOJhHOKRSoNifXHwbVIQnSIwzSIwzVIQrNJRDPJQ/NKhXCKhfKKRe8MBzXHwfVIQjSIQnTIgrRIwvPJhDKKhjQJBDYHgUmaSxIAAAAMXRSTlMA/MaSAr3oIZW7iHry4dc7NPjb0LCrnZmUYk5JRATrvoJvaFMoGxcTC+OysaNbWEEtoAHALwAAAMJJREFUKM+lktkOgjAQRWmrxbYqsqOIu4K79/9/ToJEOglvnEz6cG5v0jTjDGL0x7alDhhaZm7nPQn0+dOU+I4tgA1vGNveBaQRxzz7OJQnAuPHN56yPQ2WbD2Z/OZMgjzeyiiSkqcyLOygMkA2BdgOWJCKK8RKiObwSFAyJBLwNaBpRahMK5Xu1CM+kODC58t5PeGLGYewCEKd8OtegjRGRVEd87cRPnCyr29YA2oiy3v23577PXetB93HLSpZDdiML3AYGIuXbjHPAAAAAElFTkSuQmCC",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": true
  },
  {
    "pk": 49,
    "name": "Mibanco",
    "cci": true,
    "short_name": "Mibanco",
    "long_name": "Mibanco",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAq1BMVEUAhysGiCgCiC0JjDMqkSBnu4gZkj+Y0rGLzaeIyaAXjSSx3cSi1rme07KXz6xfuINXs3kwoloWkT0NiiYjkCI3lh1XnRl6pxKztAvC5dGp2b2S0K2TzaeDx56Cxpt8xppyv45et4BPsHQ5pF4uoFgknE85n0gRjzoikCJHmR0/lx1cnhpanhhpohZfoRZuoxVxpBR/qBCYrg2osQyuswvMugbWvQXlwQL8xgHaHfM3AAAAj0lEQVQoz9WPVw7DMAxDJa/Y2c1quvfeu/c/WV0D/bEv0DwRIEB+CIQ/xmcAuAGX3QPxVtspIhxrdnmf7IK9rqitYmBzroAQmk4JENAyZsgx7HrjYSfiUgVhIpPexOTl04/5LO4HnscjpWQ64gNTrA+FWFEhlgs6F1lGW/p+77ffLW1w2N/zUscuqFVAo/kAm7AHyroBgdoAAAAASUVORK5CYII=",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 51,
    "name": "Agrobanco",
    "cci": true,
    "short_name": "Agrobanco",
    "long_name": "Agrobanco",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABLFBMVEX///8AZk7+1wCZvRH9/v7+//z6/fz91wX1+ef998lAjXwkfGiqyDz82RiavhbV5+T9+ty+2dNuqZxrp5rG2nwbdmEOblj82iH2+vn6+/Hk7+yOvbMugm8Vcl23z1mmxTP8/fj0+vb3+ev+++fZ6ubx9t7E3dj9+NOoy8STvrSIuq+Etqv67qFYm4zx6IHI24DZ33gyhXIofmr75mgfeWS1zlT1+vn+/fTs9PP+/fHm8e/Z6uf++uDK4NzI39vr8dC21M6tz8j89cTL3sPi7L+fx76Xwbje6bX98rPa563w7ah4rqJ2raH87px3rZplo5Zko5XQ4JNgoZP77I/N3oxWmovZ4Ync4oXh3oLv5n6802W70mL65F8GaVKvykj64EGsyEGnxjalxDGfwCM0OX5hAAABQklEQVQoz22R11ICQRBF++7MLkgUkBxEogqoJHPOOecc/v8f7NlZhLK4DxPOqZ6u6qGB5MsmDUvSJ57/G6mWXSECSXWRf7zkCfJa+BY5k3ktbDk81UFUmeRGnvk0ENE1lgf2udD9uTVpOQpgzzb7AK4tcn8KIWZNKrHJLqqCDtBMkNsnhDYhADUWmwBCiuuMmbIBeLl/GGhJm49fBWyjSlaIPNxZ8+Obe9tMxIBJkhkg/aL4k8vwzylz4AWmtMgJ8TXjMgxtjpSwnwqXuznFlXl4d56iCNCUZp25NlWqAOBJbAFY32buJL50CUQtovks4KkbhqvN9IP3nTfgROqp4fw1fjbCotqOP3LrWIo4iQybU5OUGKUUc6T1eINZxCrkCBkGGpJ01loh6gmSF3cJ6sWivtBfO5ii34gv0LCsHhb7l1+ZuR3U4q0RXwAAAABJRU5ErkJggg==",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 58,
    "name": "Banco Azteca",
    "cci": true,
    "short_name": "Banco Azteca",
    "long_name": "Banco Azteca",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAsVBMVEUAAAD////////////19fXX1terqaympaf5+Pjq8e/v7+/r6+vd3N3a2tvNzM23treQuauzHCX8/Pzy8vLy8fLq6uvc6OTg4ODP4du71Mu9vL2ura9+rp3ak5gpd1v8+/v79PTv9fPv7u/47e7k7urg6+fm5+X14+Tj4+PT497U09TC2NDJx8muy8Dnu766uLrltbiavrGtq62enJ95qphroI04gGYecFO7Nz8CXz0BXj0HzN/GAAAAA3RSTlMAhSCH7IgYAAAAjklEQVQoz83MRQ7DMBQA0bT5tkOmMJeZGe5/sKpZRUm9rTLbJ432j/qKNF1RDcxpaPyC+Cau+agN4j4vjkm5akL8CgspF3nZhM3b3MvnUDxaq2TnTgzzNKsBwk7kLGlE9S1DjK3HDoIK+CXFnPBzZuOMpAdMEKEV+J7lA9jggWsFAIFh2YMvKFJDT5HWyT7c3gudD50c5AAAAABJRU5ErkJggg==",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 53,
    "name": "Banco GNB",
    "cci": true,
    "short_name": "Banco GNB",
    "long_name": "Banco GNB",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA9lBMVEX///////+Oxj/C4Jj9/f3S6LPW67vj8dH8/frp6ur6/Pj0+e3o6On2+vz1+u/t7e7r7OyZx9/5/P35+/Tw9+bn89fs9fj3+vHw8PHy+OmizOHp89pFmcSRyETy8/Ta6/PN4+6+2+rk5OWw0+Wnz+Odyd+EvNiezlyTyUmPx0Hz+Pr3+Pj29vbk8PX09fTR5vC72ejt9eDr9d2UxNyIvdh6ttR0stJAlsI5ksDZ7L++3pGz2YCs1XOh0GCZy1H5+/nu9uPi4uPf3+CLv9ptrtDg78xcpMpapMpZo8rd7sYxjb0vjLwWf7TN5avK5KbF4p683Y622oR0dewEAAAAAXRSTlPhl+sKiAAAASJJREFUKM9tz9VywzAQQNGsrdQCM0OYmZnKzP//M3X7oInS3DfNGe3OZjJwvj9IZCGPw4UklBWgnX32Npt96x98Bg52IvcjfwJbOZgkesD0bxFaVy5lFDOPvguQlyn1AgyO7rCdAEmEI50qYx1RpX08ah2xL9mV5bGb3O+PobndSdKkKbUO+baw/Lemvj6cHMgURfEchBB2lTTGgZiGXUE3EBomKRB1wEElqqmiimkQBCR9ciBd9do0SVhRe4YRhgYHPEAawjhdUuhqhR5wgGq9uig/3ALEo5f4qcOhdAdgF63cCFlaDh6LHBoxpFn+cmhpr9Olz2HagP6iZNn91Tz9UZ9z8HNFaJQtG0pv2grVZhygU6vV/SECVL6cxVWbw7l+AJngHTHJmJF2AAAAAElFTkSuQmCC",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 18,
    "name": "Banco de la Nación",
    "cci": true,
    "short_name": "Banco de la Nación",
    "long_name": "Banco de la Nación",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA1VBMVEX////////qHyb+/f3uQkjrLTT/+/uvra3/+fn4tLegnp2Rjo3ydHn+6erJx8f6xMbAv775t7qtqqmbmJjvTlP+8vP+8PD97e7u7u395ufl5OTi4eH94OH82Nra2dj81NXU09P70tPQzs76yMrHxsXEw8K4traysK/2oaSlo6L1lJj0hYnxam/wYGXvU1nuSlDtP0XtOkDrKzHqIin19fXz8vLy8fHp6Oj94uPLysr5v8G6uLf4qKr3pqn3paj1j5OVkpH0hoqLiIfzen7xZWrwWV7sNTvJyKyKAAAAAXRSTlPmCY+fKwAAAPBJREFUKM+F0teOwyAQQFGGgHGJuze991639/7/n7Rjm2ychCj3CXFAGiEIAXUp2P5XxNhiWj8CTOsuKaVbIwuy4gaFKQCiM6BzhIkCXnB//TxbrtjPm52Be7zAbNCNXzzAm/9QZJTOC4B1KZbfQY1R/ioHz4LPNx8FSKvH4CZQnkWjK9iVTy7EUDPKsO8R97/1BA5q43BTDU7A5XTlAhyDNtmuRzqcQHsxNzTFIzZ9OZqE245cVqGag8b1HUCpEkPv3RH9gVcRluN5rcAciP7wySwRMjRDKwjCzmfYcMxWbyysB0uMbwjJpak+Q7bL8Ad60BHmy5GapwAAAABJRU5ErkJggg==",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 23,
    "name": "Banco de Comercio",
    "cci": true,
    "short_name": "Banco de Comercio",
    "long_name": "Banco de Comercio",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAjVBMVEX////EFhztwcHjoKBuRUatQ0bIx8epqKhubGzGREdjVlRRT1B7enpkYWJgXl5PTE23Gh52dHVoZmdaWFlnWlhWVFRMSUpuREU1IiJdWlxTUFFfUVBbTUxVSEZDQEI+OzwmIyTLx8etqKjeoqGXlpeFhIWDgoN0c3O9R0hhSUd1R0dJRkc8ODk0MjJDMDA6SpeKAAAAhElEQVQoz93JSRaCMBBF0UQlqfRCGgQE7Hvd//KsIwOOLIE7+H/wyFwwxvaLCYZIhsoVKnEHjwwRSul6l3eFi+DA9dYataFoCGetweoaVAKTmzG8k1ex95UrnqpK9Rh8d1VGF5d4yl8A9vMLQohbG1optzLIpgn4d4EI5/yw/HfkiMzEFy+lCPwcaBv5AAAAAElFTkSuQmCC",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 54,
    "name": "Banco Falabella",
    "cci": true,
    "short_name": "Banco Falabella",
    "long_name": "Banco Falabella",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGfSURBVHgB7ZTBSsNAEIb/TVpNC2LAmyBWvRXFVjyoCOYV+gT2DdqjN+up3qpvoG+gT2CEitWDrQoe2whWUBAKxTRQk3XSXmqTJjEevPSDkGV3Zv7Z3ZkFxvw3zGux8oicxVEgI5kDLYFB4xw1Gp/HTKjpNFr4i8D1Axr0S3iYnMDEwWYa2igDwcMZlO0lvMkyEdWrKlKhBJhFGfpAxyULIkqhBGjrKu3iGP4od0+Y/7WAzdYq8nRTKkISCWJkfCEzKeBCN8RU/TWORjOGT6PvurzUxspiW1tL4tnNl/lGzysy4nqOdZkyXbeUaJs7gyR57V2KZnBY0YIL7K0rYOI+jZTBaemDQ3qzIJiAOQHoswK6U70wGjqxNI7UH70Rcc041rED5910jRlGn+i2lICk2z4Fb4F4p0S1l0UYGNsZnnJWUdjgfRL+AuCnCI/mL1C8zSJYcznhzJGcRxVtJACrQOe6i2BoKN4sDE+KI83LLy2Um2fYnqOs2D2lImP0y6pS9pmezxD+jTaIXcKSkQLjKXpqZdpdiwLXqMFUjAnLNy58fUwag1T0AAAAAElFTkSuQmCC",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": false,
    "allow_credit_card": false
  },
  {
    "pk": 55,
    "name": "Banco Ripley",
    "cci": true,
    "short_name": "Banco Ripley",
    "long_name": "Banco Ripley",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA1VBMVEX///8AAAAEBAQmJiZ0dHTp6+3S1dqanZ8VFRURERENDQ09PT02NjYqKiodHR0aGhrx8vO4i7fenrP+6ouTJjkvLy8hISG0nBr91RDk5ujg4uTaxtrGyMnctMn1trbClbTInbDkl6ejpKXnmqXZoKT56Z7mkJ371pTzvJS5ZpGAZoN1FXLqbGuFTWqDKmjAPma3NWRjY2OPOGCOM1apUVRWEVJfIE/ILUyMMEpnK0rQM0lGRkeyPkbz0zjNHjiALzeumzQyMjKTGi3neSb3rSWmWiWxfyShgPozAAAAjElEQVQoz83MNRLDMABEUUlmodkOMzMzw/2PFKV3UiZ+W/6ZBemkokQMqDCR8iUIbEHTeg8p0MTcQpjjUAYaEGUXUpMyNIEXETDBCSQfr34T8obkn6Lq/Llc+MZ1EG3Wj3N3BjK6tN3H2f592Fvpx048Hd0OzhjYmlSre3axVXIqWrPgld12I+eCf3oBdm0MpcbiUewAAAAASUVORK5CYII=",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 56,
    "name": "Banco Santander",
    "cci": true,
    "short_name": "Banco Santander",
    "long_name": "Banco Santander",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAn1BMVEX+/v7+AAD9/v38AQH6Bgb7AgH4Rkf5Fhf9/Pv77e35zMv5tbX5HyD9+fn99/f66er74+L729r62Nj4e3v3UVH5DAz75uX609L6zs/6x8b5vb74oaH4np74mpr4fn35b2/3amr3W1z5Q0T5OTr5MC/3KSn4Gxr6Dg/78vP78O/5v8D5ubn4qqn4mpn5lJP3jo74hof4dnb5dHX4V1bzT1AGukeKAAAA0UlEQVQoz62Q1xKCMBBFyW4SQBBpdkCk2vv/f5uENuMQZ3zwvuTmnmR3E+UXwQTkwN5+AUExlhZSzniV5fpojtORBHgX8FmuDwlPwFZR0v+Ja1hRHBSDU9UBPIw+QrAMV+PMnO3L5GhBDyZegT7MTORaSlC9tz8AhoqE4FpZUnbICKnQqgYGJULTOcT4YrUvXXEhJY3y3QJbiw8BzG630VlvBYi6czRsHdKl6GH5/b5bg2YsLTQFalPC+AK6B46NOKNYT8pvLjR5D23HcXRN+b/eS+MKkcpPuVgAAAAASUVORK5CYII=",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 7,
    "name": "Citibank",
    "cci": true,
    "short_name": "Citibank",
    "long_name": "Citibank",
    "image": "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAAYABgDAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAEFBgj/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAgP/2gAMAwEAAhADEAAAAOqAGZDWEVJXIsA//8QAJRABAAEEAAQHAQAAAAAAAAAAAQIDBAURABIiQQYQICExUmFi/9oACAEBAAE/APPxPdZ2U7m2xVCcApsqdSEFZvJJOrYHVqPL7PffFlf52jb1oVLWdaZUqlJnSRYCcip9jf6Py64xlxlJ5Fje2pC2aUUnE1qabTW17ov8no//xAAZEQADAAMAAAAAAAAAAAAAAAAAAQIQICH/2gAIAQIBAT8AFzEyhytf/8QAGBEBAQEBAQAAAAAAAAAAAAAAAQACECD/2gAIAQMBAT8ACThudw+P/9k=",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 43,
    "name": "Crediscotia Financiera",
    "cci": true,
    "short_name": "Crediscotia Financiera",
    "long_name": "Crediscotia Financiera",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAaVBMVEXsHCTvREvtLCPuNCL5tLf4pqnzbHHvP0buOUDvOTzuLzbvOCLvPCHwSyD0cx31gRv4qq33oKP2lpn1jJDyY2nzbGDzbFXwTFLwSE7vO0LwSkHwSCrsHiTtJiP1gSLxVh/yZB70eRz1iBsoWMt8AAAASklEQVQoz2MYBUiAiwPKkOflZpblVRBl4+BkZBNhlJKThkrwcfMpKfLzi7EICLKyCguxyMC0MvEwMTPxMHMyskuKc0mwMzKMbAAAPwwC0+RXUXIAAAAASUVORK5CYII=",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 60,
    "name": "ICBC",
    "cci": true,
    "short_name": "ICBC",
    "long_name": "ICBC",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABs1BMVEX19fX29vbv7+/Y2NjNzc3Dw8O6urq4uLj////7+/v4+Pjl5eXj4+O+vr719fX39/f////7+/vNzc27urrw8O/m5ubCwsK9AR7X19e9ARzj4+O4uLi4t7fw8PC9CSS9ByLRWmvBGzTAEiy+DifExMS9BB/5+fnZ2dnEwsG8GzP08fHFwsO+vr68T1++OEy8L0TEIzru19ns0dTkub7goKjdmqLagYy+YW3KU2e7VWK6VWK8QlO9JDnDGTP18/Pw5efl4+Pt4eLqzdHVx8niqbG7r7C4oaS8lJrAjpTHiJC6gorXd4S+cn3Vbnu6aHPJZHLMTl69SlrKQ1XHO1DIOUzFOEzGM0a8LEC/KD7FJz7BIDe9Eiu/BCHz7u/i4uLr293X0NHMzc3WzMzNy8vcwsXnvsPLwMDEv7+/vr3btbnKtbjjs7jUsrXBq626qqzgpKzPparIparIoaXOnqO+nqG6naHelJ7dkZvckJq6jJK5iY/OhY7OfYnMfIbAfIXLcHzJZ3XSY3LEY3C5W2jGWGfKV2fJV2fCTF3CSVnCQlTDP1LJPVHAPFC8PU67Mka/MEO9FzAgKxJaAAAADnRSTlP4+Pj4+Pj4+Pj4+Pj4+IKY4wYAAAGoSURBVCjPbc8Fc9swFAdwrVvH6zZJjqrZsWc7jhtmTsrMzGOGMjMzfuQqcul6/d1Jeu/973T3wPPXdzid/AEPrifuUDhUyisrKOLcsU6ZUqK3V5daAwD482OABltmo/MbOdodvhVEldyYm/cf5jQtch38U7oriq6Eg3rlZVCWGyhrec9U5q94SOt1s6AA4yYSwUFZVdUIO8oRjtEYxuCFUK52CUKwXbD0dgnlgz2CAB4W/6dLpjmoJpPL5trujtZjmuvG12LwCDbQCQjPNG34EPYPa9rBF9hAJiEotDXTEVte9tjW7+dVPam3gceomcwglPD5dD/Knvt8rQg1kgUEnoiLtFEUXYauZ8SArhsBSWqltRILapQOFpxIkiSy0xcQxVOXJLKvUEYeRS5XKpWuTadTQwFUR7YQAq+83mkj8zsrM3UK40d9eo3XCwodDkeCJEoYj8PjKfH86iCrbMb2gPDbPtn7CS1//XQTMmzzvDZjqG286nPV1LYsr/AJePmO+9NpUGIQoiS/8/4jKLBb8KdovCleXWHH2I4Z8OztDedN5QRP39zvApDjWWjDnsYZAAAAAElFTkSuQmCC",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  },
  {
    "pk": 61,
    "name": "OTROS",
    "cci": true,
    "short_name": "OTROS",
    "long_name": "OTROS",
    "image": "data:image/png;base64,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\n",
    "num_chars_min": 20,
    "num_chars_max": 20,
    "format_mask": null,
    "supports_op_code": false,
    "is_source_bank": true,
    "is_target_bank": true,
    "allow_credit_card": false
  }
];
