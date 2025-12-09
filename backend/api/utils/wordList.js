const words = [
    "Red", "Blue", "Green", "House", "Coconut", "Cat", "Dog", "Ocean", "Sky", "Mountain",
    "River", "Star", "Moon", "Sun", "Tree", "Flower", "Bird", "Fish", "Apple", "Banana",
    "Car", "Train", "Plane", "Book", "Pen", "Code", "Web", "Data", "Key", "Mouse",
    "Happy", "Sad", "Fast", "Slow", "Hot", "Cold", "Big", "Small", "New", "Old",
    "Magic", "Power", "Light", "Dark", "Wind", "Fire", "Ice", "Snow", "Rain", "Cloud"
];

export function generateRandomName() {
    const selected = [];
    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * words.length);
        selected.push(words[index]);
    }
    return selected.join(" ");
}