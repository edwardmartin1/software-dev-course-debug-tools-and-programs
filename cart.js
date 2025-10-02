
const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

/* test empty cart
const cart = [
];
*/

/* test cart with one item
const cart = [
  { name: "Headphones", price: 200 }
];
*/

function calculateTotal(cartItems) {
  try
  {
    if (!Array.isArray(cartItems)) 
    {
      throw new Error("cartItems must be an array.");
    }
  
    let total = 0;
   
    for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
      debugger;
    }
   
    return total;
  }

  catch (err)
  {
    console.error(`Error: ${err.message}`);

    return 0.00;
  }
}

function applyDiscount(total = 0.0, discountRate = 0) {
  let returnValue;
  
  try
  {
    if (typeof total !== "number")
    {
      returnValue = null;

      throw new Error("Total must be a number.");
    } 

    if (total < 0)
    {
      returnValue = 0;

      throw new Error("Total must be greater than 0.");
    }

    if (typeof discountRate !== "number") 
    {
      returnValue = total;

      throw new Error("Discount rate must be a number.");
    }

    if (discountRate < 0)
    {
      returnValue = total;

      throw new Error("Discount rate must be great than 0.");
    } 
            
    if (discountRate > 1) 
    {
      returnValue = total;

      throw new Error("Discount rate cannot be greater than 100%.");
    }

    return total - total * discountRate; // Bug: Missing validation for discountRate

  }

  catch (err)
  {
    console.error(`Error: ${err.message}`);

    return returnValue;
  }
}

function generateReceipt(cartItems, total) {
  try
  {
    if (!Array.isArray(cartItems)) 
    {
      throw new Error("cartItems must be an array.");
    }
  
    if (typeof total !== "number")
    {
      throw new Error("Total must be a number.");
    } 

    if (total < 0)
    {
      throw new Error("Total must be greater than 0.");
    }
  
    let receipt = "Items:\n";
   
    cartItems.forEach(item => {
        receipt += `${item.name}: $${item.price}\n`;
        debugger;
    });
   
    receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
   
    return receipt;
  }

  catch (err)
  {
    console.error(`Error: ${err.message}`);

    return "Total: unknown";
  }
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
//const discountedTotal = applyDiscount(total, 0); // 0% discount
//const discountedTotal = applyDiscount(total, 1); // 100% discount


const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;
