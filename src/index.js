window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/js/all.min.js"
import "./css/style.css"
import "./sass/style.scss"

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(item=> new bootstrap.Tooltip(item))

// بداية شيفرة اظهار رسالة من المتصفح عند الضغط على زر اضافة اللى عربة الشراء تخبرك بانه تم اضافة المنتج الى عربة الشراء
document.querySelectorAll('.add-to-cart-btn').forEach(item =>{
    item.addEventListener("click", () =>{
        alert("اضيف المنتج الى عربة الشراء")
    })
})
// نهاية شيفرة اظهار رسالة من المتصفح عند الضغط على زر اضافة اللى عربة الشراء تخبرك بانه تم اضافة المنتج الى عربة الشراء

// بداية شيفرة تغيير التحديد بمجرد تغيير المستخدم الى خيار اخر في انبوت راديو في مقاسات المنتج 
document.querySelectorAll('.custom-size input[type="radio"]').forEach(item => {
    item.addEventListener('change', () => {
        document.querySelectorAll(".custom-size").forEach(i => {
            i.classList.remove("active")
        })
        item.parentNode.parentNode.classList.add("active")
    })
})
// نهاية شيفرة تغيير التحديد بمجرد تغيير المستخدم الى خيار اخر في انبوت راديو في مقاسات المنتج 

// بداية شيفرة تغيير التحديد بمجرد تغيير المستخدم الى خيار اخر في انبوت راديو في الوان المنتج 
document.querySelectorAll('.custom-color input[type="radio"]').forEach(item => {
    item.addEventListener('change', () => {
        document.querySelectorAll(".custom-color").forEach(i => {
            i.classList.remove("active")
        })
        item.parentNode.parentNode.classList.add("active")
    })
})
// نهاية شيفرة تغيير التحديد بمجرد تغيير المستخدم الى خيار اخر في انبوت راديو في الوان المنتج 

// بداية شيفرة حساب سعر المنتج الاجمالي 
document.querySelectorAll('[data-product-quantity]').forEach(item => {
    item.addEventListener('change', () => {
        const newQuantity = item.value;
        const parent = item.closest('[data-product-info]');
        const priceperUnit = parent.getAttribute('data-product-price');
        const totalPriceForProduct = newQuantity * priceperUnit;
        parent.querySelector('.total-price-for-product').innerHTML = totalPriceForProduct + "$"
        
        calculateTotalPrice()
    })
})
// نهاية شيفرة حساب سعر المنتج الاجمالي 

// بداية شيفرة زر حذف منتج من عربة الشراء عند النقر يتم حذف المنتج من العربة
document.querySelectorAll('[data-remove-from-card]').forEach(item => {
    item.addEventListener('click', () => {
        item.closest("[data-product-info]").remove()
        calculateTotalPrice()
    })
})
// نهاية شيفرة زر حذف منتج من عربة الشراء عند النقر يتم حذف المنتج من العربة

// بداية شيفرة لحساب اجمالي جميع المنتجات تم استدعائها مرتين
function calculateTotalPrice(){
    let totalPriceForAllProducts = 0;
    document.querySelectorAll('[data-product-info]').forEach(product => {
        const priceperUnite = product.getAttribute('data-product-price');
        const quantity = product.querySelector('[data-product-quantity]').value
        const totalPriceForProduct = priceperUnite * quantity

        totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
    })
    document.getElementById('total-price-for-all-product').innerHTML =  totalPriceForAllProducts + "$"
}
// نهاية شيفرة لحساب اجمالي جميع المنتجات تم استدعائها مرتين


// بداية شيفرة تحديد المدينة عند تغيير البلد تلقائيا

const citiesByCountry = {
    sa: ['المدينة المنورة','جدة','الرياض'],
    eg: ['القاهرة','الإسكندرية','دمياط','شرم الشيخ','أسيوط'],
    jo: ['عمان','الزرقاء'],
    sy: ['حمص','دمشق','حلب','حماة']
}

document.querySelectorAll('select[name="country"]').forEach(item => {
    item.addEventListener('change', () => {
        const country = item.value

        const cities = citiesByCountry[country]

        document.querySelectorAll('#paymentcities option').forEach(i => i.remove())

        const firstOption = document.createElement('option')
        const optionText = document.createTextNode('اختر مدينة')
        firstOption.appendChild(optionText)
        firstOption.setAttribute('value', '')
        firstOption.setAttribute('selected', 'true')
        firstOption.setAttribute('disabled', 'true')

        const city_options = document.getElementById('paymentcities')
        city_options.appendChild(firstOption)

        cities.forEach(city => {
            const newOption = document.createElement('option')
            const optionText = document.createTextNode(city)
            newOption.appendChild(optionText)
            newOption.setAttribute('value', city)
            city_options.appendChild(newOption)
        })
    })
})
// نهاية شيفرة تحديد المدينة عند تغيير البلد تلقائيا

// بداية شيفرة اخفاء واظهار طرق الدفع المتاحة 
document.querySelectorAll('#form-checkout input[name="payment-method"]').forEach(item => {
    item.addEventListener('change', () => {
        const paymentMethod = item.value

        const creditCardInputs = document.querySelectorAll('#credit-card-info')

        if(paymentMethod === 'on-delivery'){
            creditCardInputs.forEach(input => {
                input.style.display='none'
            })
        }
        else{
            creditCardInputs.forEach(input => {
                input.style.display='flex'
            })
        }
    })
})
// نهاية شيفرة اخفاء واظهار طرق الدفع المتاحة 


// بداية شيفرة اضافة سنة حقوق الطبع والنشر في الفوتر 
document.getElementById("copyright").innerHTML = "جميع الحقوق محفوظة سنة " + new Date().getFullYear()
// نهاية شيفرة اضافة سنة حقوق الطبع والنشر في الفوتر 
