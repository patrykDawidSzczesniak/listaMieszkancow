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
                $("h2").text("Pesel nie jest poprawny.")
            }
        } else {
            $("h2").text("Pesel nie jest poprawny.")
        }
    }

    //Funkcja dodająca nowego mieszkańa/nadpisująca rekord, w którym dany pesel już wystąpił
    dodajMieszkanca() {
        if (listaMieszkancow.length !== 0){
            let powtorzenie = false;
            for (let i = 0; i < listaMieszkancow.length; i++){
                if (this.pesel === listaMieszkancow[i].pesel) {
                    listaMieszkancow[i] = this;
                    $("h2").text("Podmieniono mieszkańca")
                    powtorzenie = true;
                    break;
                }
            }
            if (!powtorzenie) {
                $("h2").text("Pesel jest poprawny, dodano nowego mieszkańca do listy.")
                listaMieszkancow.push(this);
            }
        } else {
            $("h2").text("Pesel jest poprawny, dodano nowego mieszkańca do listy.")
            listaMieszkancow.push(this);
        }
    }
}

// //Tabela zawierająca wszystkie obiekty "Wpis"
var listaMieszkancow = [];

let citizenCounter = 0;
var isEmpty = false;

function noEmptyFields() {
    isEmpty = false;

    $("input").each(function(){
        if ($(this).val() === "") {
            isEmpty = true;
            return false;
        }
    });
    return isEmpty;
}

$("#add-new-citizen").click(function(){
    noEmptyFields();
    let currentNumberOfCitizens = listaMieszkancow.length;
    if(isEmpty === false){
        Wpis[citizenCounter] = new Wpis(
            miasto = $("#miasto").val(), 
            pesel = $("#pesel").val(), 
            imie = $("#imie").val(), 
            nazwisko = $("#nazwisko").val()
            );
        Wpis[citizenCounter].sprawdzPesel();
        if (currentNumberOfCitizens !== listaMieszkancow.length){
            citizenCounter++;
        }
    } else {
        $("h2").text("Nie wypełniono wszystkich wymaganych pól!")
    }
});

$("#download").click(function(){
    if(listaMieszkancow.length === 0){
         $("h2").text("Lista nie zawiera żadnych elementów!")
    } else {
        let listText = "Miasto  |  Pesel  |  Imie  |  Nazwisko" + "\n" + "--------+---------+--------+----------" + "\n";
        listaMieszkancow.map(element => 
            (JSON.stringify(
                element.miasto,
                element.pesel,
                element.imie,
                element.nazwisko,
                listText += element.miasto + " | " + element.pesel + " | " + element.imie + " | " + element.nazwisko + "\n"
            )
        ));
        var blob = new Blob([listText], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "Lista mieszkancow.txt");
        $("h2").text("Lista została pobrana!")
    }
});



// //Przykład utworzenia kilku mieszkańców
// const Wpis1 = new Wpis('fff', '02070803628', 'fff', "fff");
// const Wpis3 = new Wpis('fof', '02070803628', 'fof', "fof");
// const Wpis6 = new Wpis('hhh', '02070803628', 'hhh', "hhh");
// const Wpis7 = new Wpis('gagg', '22948200344', 'ggag', "gagg");

// //Dodanie wyżej utworzonych obiektów do tabeli
// Wpis1.sprawdzPesel();
// Wpis3.sprawdzPesel();
// Wpis6.sprawdzPesel();
// Wpis7.sprawdzPesel();

// //Sprawdzenie poprawności funkcji, oczekiwany efekt to:
//     // Pesel jest poprawny, dodano nowego mieszkańca do listy.
//     // Podmieniono mieszkańca
//     // Podmieniono mieszkańca
//     // Pesel jest poprawny, dodano nowego mieszkańca do listy.
//     // (2) [Wpis, Wpis]
//     // 0: Wpis {miasto: 'hhh', pesel: '02070803628', imie: 'hhh', nazwisko: 'hhh'}
//     // 1: Wpis {miasto: 'gagg', pesel: '22948200344', imie: 'ggag', nazwisko: 'gagg'}
// console.log(listaMieszkancow);