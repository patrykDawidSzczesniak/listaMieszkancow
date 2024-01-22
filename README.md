class Wpis {
    //Constructor pozwala na tworzenie obiektu "Wpis"
    constructor(miasto, pesel, imie, nazwisko) {
        this.miasto = miasto;
        this.pesel = pesel;
        this.imie = imie;
        this.nazwisko = nazwisko;
    }

    //Funkcja licząca i sprawdzająca pesel pod kątem: ilości symboli oraz sumy kontrolnej
    sprawdzPesel() {
        let peselString = String(this.pesel);
        if (peselString.length === 11){
            var array = [];
            array = peselString.split('');
            
            array[0] *= 1;
            array[1] *= 3;
            array[2] *= 7;
            array[3] *= 9;
            array[4] *= 1;
            array[5] *= 3;
            array[6] *= 7;
            array[7] *= 9;
            array[8] *= 1;
            array[9] *= 3;

            let sumaKontrolna = 0;

            for (let i = 0; i <= 9; i++){
                if (array[i] >= 10){
                    array[i] = redukcjaDwucyfrowych(array[i]);
                    sumaKontrolna += array[i];
                } else {
                    sumaKontrolna += array[i];
                }
            }

            function redukcjaDwucyfrowych(liczba){
                let ostatniaCyfra = liczba % 10;
                return ostatniaCyfra;
            }
            
            if ((10 - redukcjaDwucyfrowych(sumaKontrolna)) == array[10]){
                this.dodajMieszkanca();
            } else {
                console.log("Pesel nie jest poprawny");
            }
        } else {
            console.log("Pesel nie jest poprawny");
        }
    }

    //Funkcja dodająca nowego mieszkańa/nadpisująca rekord, w którym dany pesel już wystąpił
    dodajMieszkanca() {
        if (listaMieszkancow.length !== 0){
            let powtorzenie = false;
            for (let i = 0; i < listaMieszkancow.length; i++){
                if (this.pesel === listaMieszkancow[i].pesel) {
                    listaMieszkancow[i] = this;
                    console.log("Podmieniono mieszkańca");
                    powtorzenie = true;
                    break;
                }
            }
            if (!powtorzenie) {
                console.log("Pesel jest poprawny, dodano nowego mieszkańca do listy.");
                listaMieszkancow.push(this);
            }
        } else {
            console.log("Pesel jest poprawny, dodano nowego mieszkańca do listy.");
            listaMieszkancow.push(this);
        }
    }
}

//Tabela zawierająca wszystkie obiekty "Wpis"
var listaMieszkancow = [];

//Przykład utworzenia kilku mieszkańców
const Wpis1 = new Wpis('fff', '02070803628', 'fff', "fff");
const Wpis3 = new Wpis('fof', '02070803628', 'fof', "fof");
const Wpis6 = new Wpis('hhh', '02070803628', 'hhh', "hhh");
const Wpis7 = new Wpis('gagg', '22948200344', 'ggag', "gagg");

//Dodanie wyżej utworzonych obiektów do tabeli
Wpis1.sprawdzPesel();
Wpis3.sprawdzPesel();
Wpis6.sprawdzPesel();
Wpis7.sprawdzPesel();

//Sprawdzenie poprawności funkcji, oczekiwany efekt to:
    // Pesel jest poprawny, dodano nowego mieszkańca do listy.
    // Podmieniono mieszkańca
    // Podmieniono mieszkańca
    // Pesel jest poprawny, dodano nowego mieszkańca do listy.
    // (2) [Wpis, Wpis]
    // 0: Wpis {miasto: 'hhh', pesel: '02070803628', imie: 'hhh', nazwisko: 'hhh'}
    // 1: Wpis {miasto: 'gagg', pesel: '22948200344', imie: 'ggag', nazwisko: 'gagg'}
console.log(listaMieszkancow);
