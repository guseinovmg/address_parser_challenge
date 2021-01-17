Написать парсер домов на улице. Есть диапазоны домов, которые записаны в виде

удобном для человека. Необходимо по данным записям определять входит конкретный

номер дома в диапазон.

Возможные варианты:

• четные 2-28, нечетные 1-21

• нечетные 11+, четные 42+

• четные с 20 и вся улица до конца

• 7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а

• 12, 22, 36, 42, 45, 100-106

• 4а, 5-7 четные 42+ нечетные с 21 и вся улица до конца

Предоставленные варианты могут быть записаны разными способами, например:

• четные 2-28, нечетные 1-21

• четные 2-28; нечетные 1-21

• четные 2-28 нечетные 1-21

• четные2-28нечетные1-21

P.S. Парсер должен быть написан на Typescript

// Шаблон класса

class HousesParser {

constructor(private readonly source: string) {}

isHouseIncluded(houseNumber: string): boolean {}

}

// Пример использования

new HousesParser('четные 2-28, нечетные 1-21').isHouseIncluded('18')