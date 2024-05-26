const fs = require('fs');

// Read the input file and parse its content into an array of book objects
function readBooks(libraryFile) {
    try {
        const data = fs.readFileSync(libraryFile, 'utf-8');
        const lines = data.trim().split('\n');
        return lines.map(line => {
            const [name, writer, isbn, year] = line.split('/');
            return { name, writer, isbn, year: parseInt(year, 10) };
        });
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        return [];
    }
}

// Write the array of book objects back to the file
function writeBooks(libraryFile, books) {
    const data = books.map(book => `${book.name}/${book.writer}/${book.isbn}/${book.year}`).join('\n');
    fs.writeFileSync(libraryFile, data, 'utf-8');
}

// Print the current library file content
function printDatabase(libraryFile) {
    const books = readBooks(libraryFile);
    books.sort((a, b) => a.year - b.year);
    console.log('\nCurrent library Content:');
    books.forEach(book => {
        console.log(`${book.name} by ${book.writer} (ISBN: ${book.isbn}, Year: ${book.year})`);
    });
}

module.exports = {
    readBooks,
    writeBooks,
    printDatabase
};
