const breakfastMenu = ['Pancakes', 'Waffles', 'Omelette', 'French Toast', 'Bagel with Cream Cheese'];
const mainCourseMenu = ['Grilled Chicken Sandwich', 'Caesar Salad', 'Veggie Wrap', 'BLT Sandwich', 'Tomato Soup'];
const dessertMenu = ['Cheesecake', 'Ice Cream', 'Tiramisu', 'Chocolate Cake', 'Fruit Salad'];

 const breakfastMenuItemsHTML = breakfastMenu.map((item, index) => `<p>Item ${index + 1}: ${item}</p>`).join('');
        document.getElementById('breakfastMenuItems').innerHTML = breakfastMenuItemsHTML;

let mainCourseItem = '';
mainCourseMenu.forEach((item, index) => {
mainCourseItem += `<p>Item ${index + 1}: ${item}</p>`;});
document.getElementById('mainCourseMenuItems').innerHTML = mainCourseItem;
    

let dessertItem = '';
for (let i = 0; i < dessertMenu.length; i++) {
    dessertItem += `<p>Item ${i + 1}: ${dessertMenu[i]}</p>`;}
document.getElementById('dessertMenuItems').innerHTML = dessertItem;

