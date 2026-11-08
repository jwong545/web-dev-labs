// Jimmy Wong
// November 8, 2026
// ITMO-541-01
// Final Project: Mini Store -- script.js
/* =========================================================================
   Mini Store — STARTER FILES
   Web Development I — Capstone Project

   WHAT'S ALREADY DONE FOR YOU:
     - Fetching real product data from a live API (with loading/error states)
     - Rendering the product grid from that data
     - Category filter and price sort
     - Wiring the Add to Cart and cart quantity buttons to call functions

   WHAT YOU NEED TO BUILD (search this file for "TODO"):
     1. cart.addItem()       — add a product to the cart, or bump its quantity
     2. cart.decreaseItem()  — lower a quantity, removing the item at 0
     3. cart.removeItem()    — remove an item from the cart entirely
     4. cart.getTotal()      — calculate the cart's grand total
     5. cart.getItemCount()  — calculate how many items are in the cart total
     6. The checkout form's submit handler — validate and confirm an order

   Run this page right now (see README.md for how) — you should already see
   real products loading from the internet. Your job is to make the cart
   actually work on top of that.
   ========================================================================= */

/* ---- Demo overrides -----------------------------------------------------
   The real API has no idea which products WE want to mark on sale or out
   of stock for this project. This object lets us layer that information on
   top of the real data, using product ids you can see by opening
   https://dummyjson.com/products yourself in a browser tab. */
const demoOverrides = {
  1: { onSale: true, salePrice: 29.99 },
  4: { inStock: false },
  7: { onSale: true, salePrice: 15.99 },
  14: { inStock: false },

  // Jimmy - Add more overrides here 
  2: { onSale: true, salePrice: 49.99 },
  5: { inStock: false },
  8: { onSale: true, salePrice: 29.99 },
  11: { inStock: false },
};

let products = [];           // the fetched + merged catalog lives here once loaded
let currentCategory = "all"; // updated by the category dropdown
let currentSort = "default"; // updated by the sort dropdown

/* =========================================================================
   THE CART
   This is the same "group state and behavior together" pattern as
   LikeCounter back in Lab 8 — just applied to a list of items instead of
   a single number. `items` is the state. Everything below it is a method
   that's allowed to change that state.
   ========================================================================= */
const cart = {
  // Each entry in this array will look like: { id, name, price, quantity }
  // Storing an ARRAY of small objects (not just a running total number) is
  // what lets us show a real itemized list in the cart panel, and lets each
  // item track its own quantity independently.
  items: [],

  /**
   * TODO 1: Add a product to the cart.
   *
   * Two cases to handle:
   *   - If this exact product is ALREADY in `this.items`, don't add a
   *     second row for it — just increase its existing quantity by 1.
   *   - If it's NOT already in `this.items`, push a brand new entry with
   *     quantity: 1.
   *
   * HINTS:
   *   - `this.items.find(i => i.id === product.id)` will return the
   *     matching entry if one exists, or `undefined` if it doesn't.
   *   - Remember to use effectivePrice(product) instead of product.price,
   *     so a sale item is added to the cart at its sale price.
   *   - Don't forget to call `this.render()` at the end so the cart panel
   *     on screen actually updates — nothing will appear otherwise.
   *
   * See the README's "Add & Remove Patterns" section for a worked example
   * of this exact find-or-push pattern, applied to a different scenario.
   */
  addItem(product) {
    // TODO: your code here
    if (!product || typeof product.id !== 'number') {
      console.warn('Invalid product passed to addItem:', product);
      return;
    }

    const existingItem = this.items.find(i => i.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: effectivePrice(product),
        quantity: 1
      });
    }

    this.render();
  },

  /**
   * TODO 2: Decrease a cart item's quantity by 1.
   *
   * If the quantity would drop to 0 or below, remove that item from
   * `this.items` entirely instead of leaving a quantity-0 row sitting there.
   *
   * HINTS:
   *   - Find the matching entry the same way as addItem.
   *   - If nothing matches, log a console.warn and return early — the same
   *     defensive-check habit from Lab 8.
   *   - `this.items = this.items.filter(i => i.id !== id)` removes an entry
   *     by id, if you need it.
   *   - Don't forget to call `this.render()`.
   */
  decreaseItem(id) {
    // TODO: your code here
    if (typeof id !== 'number') {
      console.warn('Invalid id passed to decreaseItem:', id);
      return;
    }

    const existingItem = this.items.find(i => i.id === id);
    if (!existingItem) {
      console.warn(`No item with id ${id} found in cart.`);
      return;
    }

    existingItem.quantity -= 1;

    if (existingItem.quantity <= 0) {
      this.items = this.items.filter(i => i.id !== id);
    }

    this.render();
  },

  /**
   * TODO 3: Remove a cart item completely, regardless of its quantity.
   *
   * HINT: this is the shortest one — one line to rebuild `this.items`
   * without the matching id, plus a call to `this.render()`.
   */
  removeItem(id) {
    // TODO: your code here
    if (typeof id !== 'number') {
      console.warn('Invalid id passed to removeItem:', id);
      return;
    }

    this.items = this.items.filter(i => i.id !== id);
    this.render();
  },

  /**
   * TODO 4: Calculate the cart's grand total across every item.
   *
   * Each entry has both a `price` and a `quantity` — you need the sum of
   * (price times quantity) across all of them, not just the sum of prices.
   *
   * HINT: `this.items.reduce((sum, i) => ... , 0)` is built exactly
   * for "combine every item in an array into one single number."
   */
  getTotal() {
    // TODO: replace this line
    if (!Array.isArray(this.items)) {
      console.warn('Cart items is not an array:', this.items);
      return 0;
    }

    const total = this.items.reduce((sum, item) => {
      if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
        console.warn('Invalid item in cart:', item);
        return sum;
      }
      return sum + (item.price * item.quantity);
    }, 0);

    return total;
    // return 0;
  },

  /**
   * TODO 5: Calculate the total NUMBER of items in the cart.
   *
   * This is different from `this.items.length` — three different products
   * with quantity 2 each should count as 6, not 3.
   *
   * HINT: same `reduce` shape as getTotal, just adding up quantities
   * instead of price times quantity.
   */
  getItemCount() {
    // TODO: replace this line
    if (!Array.isArray(this.items)) {
      console.warn('Cart items is not an array:', this.items);
      return 0;
    }

    const count = this.items.reduce((sum, item) => {
      if (typeof item.quantity !== 'number') {
        console.warn('Invalid item in cart:', item);
        return sum;
      }
      return sum + item.quantity;
    }, 0);

    return count;
    // return 0;
  },

  // Provided for you — this turns your `items` array into the actual HTML
  // in the cart panel. You shouldn't need to change this function; call it
  // (via this.render()) any time your cart state changes.
  render() {
    renderCartSummary(this.items, this.getTotal(), this.getItemCount());

    // Optional -- not required. Save after every cart change:
    localStorage.setItem("cart", JSON.stringify(this.items));
  },
};

/* ---- DOM references ----------------------------------------------------- */
const productGrid = document.querySelector("#product-grid");
const statusMessage = document.querySelector("#status-message");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-select");
const cartItemsEl = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const cartCountEl = document.querySelector("#cart-count");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutMessage = document.querySelector("#checkout-message");

/* =========================================================================
   FETCHING REAL PRODUCT DATA — already working, read this to understand it
   ========================================================================= */
async function loadProducts() {
  // Step 1: tell the visitor something is happening, and clear old content.
  statusMessage.textContent = "Loading products…";
  productGrid.innerHTML = "";

  try {
    // Step 2: `await` pauses THIS function only, until the network request
    // finishes. Nothing else on the page freezes while this is happening.
    
    const response = await fetch("https://dummyjson.com/products");
    
    // Temporary fallback — while the live API is down, load a local copy of the same data instead.
    // const response = await fetch("products-fallback.json");

    // Step 3: fetch() only fails on a total network error (like being
    // offline). A 404 or 500 still "succeeds" as far as fetch is concerned —
    // response.ok is how you check whether the SERVER said it worked.
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Step 4: the response body has to be parsed out of raw text into real
    // JavaScript — that parsing is itself asynchronous. This API wraps its
    // array inside a "products" property alongside some pagination info
    // (total, skip, limit), rather than returning a bare array directly —
    // that's why this needs .products and not just the parsed body itself.
    const data = await response.json();
    const raw = data.products;

    // Step 5: the real API doesn't know about OUR onSale/inStock demo data,
    // so we build our own array by transforming each fetched item and
    // layering in any override that exists for its id.
    products = raw.map((item) => {
      const overrides = demoOverrides[item.id] || {};
      return {
        id: item.id,
        name: item.title,       // renaming API's "title" to our "name"
        price: item.price,
        category: item.category,
        inStock: true,           // sensible default...
        onSale: false,           // ...overridden below if this id has one
        ...overrides,
      };
    });

    populateCategoryFilter(products);
    statusMessage.textContent = "";
    renderProducts(getVisibleProducts());
  } catch (error) {
    // This runs if the fetch failed outright, OR if we threw the error
    // above for a bad status code. Either way: show something human, not
    // a blank page or a scary red console message.
    console.error("loadProducts failed:", error);
    statusMessage.textContent =
      "Couldn't load products right now. Please check your connection and try again.";
  }
}

// Builds the category dropdown's options from whatever categories actually
// showed up in the real data — we don't hard-code the category list.
function populateCategoryFilter(list) {
  const categories = [...new Set(list.map((p) => p.category))];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  });
}

// A product's "real" price for cart/sort purposes — its sale price if it
// has one, otherwise its normal price. Both the cart and the sort control
// use this, so a sale item is always treated consistently everywhere.
function effectivePrice(product) {
  return product.onSale ? product.salePrice : product.price;
}

// Applies the current category filter and current sort choice to the full
// products array, without ever touching `products` itself or re-fetching.
function getVisibleProducts() {
  let list = [...products];

  if (currentCategory !== "all") {
    list = list.filter((p) => p.category === currentCategory);
  }

  if (currentSort === "asc") {
    list = [...list].sort((a, b) => effectivePrice(a) - effectivePrice(b));
  } else if (currentSort === "desc") {
    list = [...list].sort((a, b) => effectivePrice(b) - effectivePrice(a));
  }

  return list;
}

/* =========================================================================
   RENDERING PRODUCTS — already working, read this to understand it
   ========================================================================= */
function renderProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    productGrid.innerHTML = "<p>No products match this filter.</p>";
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    let badgeHtml = "";
    if (product.onSale) {
      badgeHtml = `<span class="badge badge-sale">Sale</span>`;
    } else if (!product.inStock) {
      badgeHtml = `<span class="badge badge-stock">Out of Stock</span>`;
    }

    const priceHtml = product.onSale
      ? `<span class="price-original">$${product.price.toFixed(2)}</span>` +
        `<span class="price-sale">$${product.salePrice.toFixed(2)}</span>`
      : `<span class="price">$${product.price.toFixed(2)}</span>`;

    // The button below already has data-id="..." and is already wired up
    // (scroll down to "Event wiring") to call cart.addItem() for you —
    // your job is making addItem() itself actually do something.
    card.innerHTML = `
      ${badgeHtml}
      <h3 class="product-name">${escapeHtml(product.name)}</h3>
      <p class="product-category">${escapeHtml(product.category)}</p>
      <p class="product-price">${priceHtml}</p>
      <button class="add-to-cart-btn" data-id="${product.id}" ${product.inStock ? "" : "disabled"}>
        ${product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    `;

    productGrid.appendChild(card);
  });
}

/* =========================================================================
   RENDERING THE CART PANEL — already working, read this to understand it
   This function is called every time cart.render() runs. You should not
   need to edit it, but read it — it shows you exactly what shape of data
   your cart methods above need to produce.
   ========================================================================= */
function renderCartSummary(items, total, count) {
  cartItemsEl.innerHTML = "";

  if (items.length === 0) {
    cartItemsEl.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
  } else {
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <span>${escapeHtml(item.name)} &times; ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">&minus;</button>
        <button class="qty-btn" data-action="remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
      `;
      cartItemsEl.appendChild(li);
    });
  }

  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = count;
}

// A small safeguard so a weird product name/category can never break the
// page's HTML structure. Provided for you — no changes needed.
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================================
   EVENT WIRING — already working, read this to understand it
   Notice there is ONE listener per container (event delegation), not one
   listener per button. This works even for buttons that don't exist yet
   when the page first loads, since products render in dynamically.
   ========================================================================= */
productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart-btn");
  if (!button) return; // the click was somewhere else on the card, ignore it

  const id = Number(button.dataset.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    console.warn(`Add to Cart clicked, but product ${id} was not found.`);
    return;
  }
  cart.addItem(product); // <-- this calls YOUR code from TODO 1
});

cartItemsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".qty-btn");
  if (!button) return;

  const id = Number(button.dataset.id);
  if (button.dataset.action === "decrease") {
    cart.decreaseItem(id); // <-- this calls YOUR code from TODO 2
  } else if (button.dataset.action === "remove") {
    cart.removeItem(id);   // <-- this calls YOUR code from TODO 3
  }
});

categoryFilter.addEventListener("change", (event) => {
  currentCategory = event.target.value;

  // Optional — save the user's category preference so it persists across page reloads:
  // localStorage.setItem("savedCategory", currentCategory);

  renderProducts(getVisibleProducts());
});

sortSelect.addEventListener("change", (event) => {
  currentSort = event.target.value;

  // Optional — save the user's sort preference so it persists across page reloads:
  localStorage.setItem("savedSort", currentSort);
  
  renderProducts(getVisibleProducts());
});

document.querySelector("#cart-toggle").addEventListener("click", () => {
  document.querySelector("#cart-panel").scrollIntoView({ behavior: "smooth" });
});

/* =========================================================================
   TODO 6: Checkout form validation and confirmation
   ========================================================================= */
checkoutForm.addEventListener("submit", (event) => {
  // Always the first line in a form submit handler — stops the browser
  // from doing its default "reload the page" behavior.
  event.preventDefault();

  // TODO 6a: If the cart is empty (cart.items.length === 0), set
  //          checkoutMessage.textContent to something like "Your cart is
  //          empty — add something before checking out." and return early.
  //          Tip: checkoutMessage.className = "checkout-message checkout-error";
  //          adds the red error styling already defined in styles.css.
  if (cart.items.length === 0) {
    checkoutMessage.textContent = "Your cart is empty — add something before checking out.";
    checkoutMessage.className = "checkout-message checkout-error";
    return;
  }

  // TODO 6b: If the form isn't valid — checkoutForm.checkValidity() returns
  //          true or false — show a validation error message the same way,
  //          and return early. This catches empty required fields and a
  //          malformed email automatically, since the inputs already have
  //          type="email" and required attributes in index.html.
  if (!checkoutForm.checkValidity()) {
    checkoutMessage.textContent = "Please fill out all required fields correctly.";
    checkoutMessage.className = "checkout-message checkout-error";
    return;
  }

  // TODO 6c: If we get this far, the order is good. Build a success
  //          message using cart.getTotal() and cart.getItemCount(),
  //          something like: "Thanks! Your order of X item(s) totaling
  //          $Y has been placed." Set checkoutMessage.className to
  //          "checkout-message checkout-success".
  if (cart.items.length > 0 && checkoutForm.checkValidity()) {
    const itemCount = cart.getItemCount();
    const total = cart.getTotal().toFixed(2);
    checkoutMessage.textContent = `Thanks! Your order of ${itemCount} item(s) totaling $${total} has been placed.`;
    checkoutMessage.className = "checkout-message checkout-success";
    
    console.log(`Order placed: ${itemCount} item(s), total $${total}`);
  }

  // TODO 6d: Empty the cart (cart.items = []), call cart.render(), and
  //          reset the form (checkoutForm.reset()) so it's ready for a
  //          fresh order next time.
  cart.items = [];
  // Optional — not required. Save after every cart change:
  localStorage.setItem("cart", JSON.stringify(cart.items));
  cart.render();
  checkoutForm.reset();
});

/* ---- Kick things off ----------------------------------------------------- */
// Optional -- Check for a saved sorting preference and visually update the dropdown
const savedSort = localStorage.getItem("savedSort");
if (savedSort) {
  currentSort = savedSort;
  sortSelect.value = savedSort;
}
// Optional -- Check for a saved category preference and visually update the dropdown
// const savedCategory = localStorage.getItem("savedCategory");
// if (savedCategory) {
//   currentCategory = savedCategory;
//   categoryFilter.value = savedCategory;
// }

loadProducts();

// Optional — load once when the page starts:
const saved = localStorage.getItem("cart");
if (saved) {
  cart.items = JSON.parse(saved);
}

cart.render(); // shows "Your cart is empty" immediately, before anything is added