def in_hoa_don(danh_sach_mon, is_wednesday=False, leave_tip=False):
    sub_total = 0
    danh_sach_str = ""

    # Tính tổng tiền và tạo chuỗi danh sách
    for i, mon in enumerate(danh_sach_mon):
        thanh_tien = mon['price'] * mon['quantity']
        sub_total += thanh_tien
        danh_sach_str += f"║ {i+1}. {mon['name']:<10} x{mon['quantity']:<4} @{mon['price']}k = {thanh_tien}k  ║\n"

    # Tính phần trăm giảm giá
    discount_percent = 0
    if sub_total > 1000:
        discount_percent += 15
    elif sub_total > 500:
        discount_percent += 10
    
    if is_wednesday:
        discount_percent += 5

    # Tính toán chi phí
    discount_amount = sub_total * (discount_percent / 100)
    sau_giam = sub_total - discount_amount
    vat = sau_giam * 0.08
    tip = (sau_giam * 0.05) if leave_tip else 0
    total_to_pay = sau_giam + vat + tip

    def format_vnd(amount):
        return f"{int(amount * 1000):,}đ".replace(',', '.')

    # In hóa đơn
    print("╔══════════════════════════════════════╗")
    print("║          HÓA ĐƠN NHÀ HÀNG            ║")
    print("╠══════════════════════════════════════╣")
    print(danh_sach_str.rstrip())
    print("╠══════════════════════════════════════╣")
    print(f"║ Tổng cộng:              {format_vnd(sub_total):<12} ║")
    print(f"║ Giảm giá ({discount_percent}%):           {format_vnd(discount_amount):<12} ║")
    print(f"║ VAT (8%):               {format_vnd(vat):<12} ║")
    print(f"║ Tip ({'5%' if leave_tip else '0%'}):               {format_vnd(tip):<12} ║")
    print("╠══════════════════════════════════════╣")
    print(f"║ THANH TOÁN:             {format_vnd(total_to_pay):<12} ║")
    print("╚══════════════════════════════════════╝")

# --- CHẠY THỬ ---
mon_an = [
    {"name": "Phở bò", "quantity": 2, "price": 65},
    {"name": "Trà đá", "quantity": 3, "price": 5},
    {"name": "Bún chả", "quantity": 1, "price": 55}
]

in_hoa_don(mon_an, is_wednesday=False, leave_tip=True)