function createCart() {
    // Private data
    let items = [];
    let discountCode = null;
    
    return {
        // Thêm sản phẩm
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) item.quantity = newQuantity <= 0 ? 0 : newQuantity;
        },
        
        // Tính tổng tiền (chưa tính giảm giá)
        getSubTotal() {
            return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },

        // Tính tổng tiền (đã tính giảm giá)
        getTotal() {
            let total = this.getSubTotal();
            if (discountCode === "SALE10") total *= 0.9;
            if (discountCode === "SALE20") total *= 0.8;
            if (discountCode === "FREESHIP") total -= 30000;
            return total > 0 ? total : 0;
        },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) {
            discountCode = code;
        },
        
        // In giỏ hàng dạng console.table cho đẹp và dễ nhìn
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            const displayItems = items.map(i => ({
                "Sản phẩm": i.name,
                "SL": i.quantity,
                "Đơn giá": i.price.toLocaleString('vi-VN'),
                "Tổng": (i.price * i.quantity).toLocaleString('vi-VN')
            }));
            console.table(displayItems);
            console.log(`=> Tổng cộng: ${this.getTotal().toLocaleString('vi-VN')}đ`);
            if(discountCode) console.log(`(Đã áp dụng mã: ${discountCode})`);
            console.log("└──────────────────────────────────────────────┘\n");
        },
        
        // Lấy tổng số sản phẩm
        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountCode = null;
        }
    };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // -> 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // -> 2