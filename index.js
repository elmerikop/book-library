const readline = require('readline');
const library = require('./src/library');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const libraryFile = process.argv[2];

if (!libraryFile) {
    console.error('Please provide path to the library file as the first command line argument.');
    process.exit(1);
}

// Check that library file exists
fs.access(libraryFile, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Library file ${libraryFile} does not exist.`)
            process.exit(1);
        } else {
            showMenu();
        }
});

function showMenu() {
    console.log('\nMenu:');
    console.log('1) Add new book');
    console.log('2) Print current database content');
    console.log('Q) Exit');
    rl.question('Select an option: ', handleMenuSelection);
}

function handleMenuSelection(option) {
    switch (option.trim()) {
        case '1':
            addNewBook();
            break;
        case '2':
            library.printDatabase(libraryFile);
            showMenu();
            break;
        case 'Q':
        case 'q':
            rl.close();
            break;
        default:
            console.log('Invalid option. Please try again.');
            showMenu();
            break;
    }
}

// Add a new book to the library file based on user input
function addNewBook() {
    rl.question('Enter book name: ', (name) => {
        rl.question('Enter writer\'s name: ', (writer) => {
            rl.question('Enter ISBN: ', (isbn) => {
                rl.question('Enter publishing year: ', (year) => {
                    const book = { name, writer, isbn, year: parseInt(year) };
                    console.log('You entered: ', book);
                    rl.question('Do you want to add this book to the database? (Y/N): ', (confirm) => {
                        if (confirm.toLowerCase() === 'y') {
                            let books = library.readBooks(libraryFile);
                            books.push(book);
                            books.sort((a, b) => a.year - b.year);
                            library.writeBooks(libraryFile, books);
                            console.log('Book added successfully.');
                            showMenu();
                        } else {
                            console.log('Did not add book');
                            showMenu();
                        }
                    });
                });
            });
        });
    });
}

rl.on('close', () => {
    console.log('\nExiting program.');
    process.exit(0);
});
