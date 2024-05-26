const path = require('path')
const library = require('../src/library');
const fs = require('fs');

describe('Given a book library exists', () => {
    const testFilePath = path.join(__dirname, 'test_library.txt');

    beforeAll(() => {
        if (!fs.existsSync(testFilePath)) {
            fs.writeFileSync(testFilePath, `
Last Wish/Andrzej Sapkowski/9780060935467/1993
A Dance with Dragons/George Martin/9102381023/2011
            `.trim());
        }
    });
    
    afterAll(() => {
        fs.unlinkSync(testFilePath);
    });

    describe('When readBooks is called', () => {
        test('Then it should read and parse books from file', async () => {
            const books = library.readBooks(testFilePath);
            expect(books).toEqual([
                { name: 'Last Wish', writer: 'Andrzej Sapkowski', isbn: '9780060935467', year: 1993 },
                { name: 'A Dance with Dragons', writer: 'George Martin', isbn: '9102381023', year: 2011 }
            ]);
        });

    });

    describe('When writeBooks is called', () => {
        test('Then it should write book to file', async () => {
            const books = library.readBooks(testFilePath);
            const newBook = { name: 'Hannibal Rising', writer: 'Thomas Harris', isbn: '9812739812712', year: 2006 }
            books.push(newBook)
            books.sort((a, b) => a.year - b.year);
            library.writeBooks(testFilePath, books);
            const data = fs.readFileSync(testFilePath, 'utf-8');
            expect(data).toBe(
                'Last Wish/Andrzej Sapkowski/9780060935467/1993\n' +
                'Hannibal Rising/Thomas Harris/9812739812712/2006\n' +
                'A Dance with Dragons/George Martin/9102381023/2011'
            );
        });

    });
});
