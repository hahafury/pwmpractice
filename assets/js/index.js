var app = new Vue({
    el:"article",
    data:{
        products: [
            {id:1, title:"Thunder F1", short_text: "Bullhorn", image: '../img/5323_Web small-RZNL140508_004.jpg', desc: "HR: Tm:0-2"},
            {id:2, title:"Yanka F1", short_text: "Sivri", image: '../img/YANLA.jpg', desc: "HR: Tm:0"},
            {id:3, title:"Bellflower", short_text: "HABANERO PEPPER", image: '../img/HABANERO.jpg', desc: "One of the hottest peppers in the world, common colors are orange and red but white, brown, yellow and pink are also seen, comes from the Amazonas region and from there it was spread through Mexico.The Habanero’s heat, fruity, citrus-like flavor and its floral aroma, have made it a popular ingredient in hot sauces and spicy foods."},
            {id:4, title:"SWEET COLORED BELL PEPPER", short_text: "I haven't found a description :(", image: '../img/SWETT.jpg', desc: "Cultivars of this plant produce fruits in different colors, including red, yellow, orange and green. They are native of America and introduced to Spain in 1493 and from there spread to other European, African and Asian countries. Bell peppers are rich source of antioxidants and Vitamin C."},
            {id:5, title:"GHOST FRESH PEPPERS", short_text: "GIANT GHOST PEPPER", image: '../img/GHOST.jpg', desc: "This group of fresh peppers is made up of some amazing and super hot Ghost Peppers. You will receive a random assortment of the following fresh peppers:",}
        ],
        product: [
            
        ],
        btnVisible: 0,
        cartInfo: [],
        contactField: [],
        formVisible: 1,
        orderVisible: 0,
        cartInfoVisible:1,
    },
    mounted:function(){
        console.log(window.localStorage.getItem('prod'));
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods:{
        addItem:function(id){
            window.localStorage.setItem('prod',id);
        },
        getProduct:function(){
            if(window.location.hash){
                var id = window.location.hash.replace('#', '');
                if(this.products && this.products.length > 0){
                    for(i in this.products){
                        if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product = this.products[i];
                    }
                }
            }
        },
        addToCart:function(id){
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',');
            };
            
            if(cart.indexOf(String(id)==-1)){
                cart.push(id);
                window.localStorage.setItem('cart',cart.join());
                this.btnVisible=1;
            }
        },
        checkInCart:function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id))!=-1) this.btnVisible=1;
        },
        getCart:function(){
            if(window.localStorage.getItem('cart')){
                for(id in window.localStorage.getItem('cart').split(',')){
                    for(p in this.products){
                        if(this.products[p].id == window.localStorage.getItem('cart').split(',')[id]){
                            this.cartInfo.push(this.products[p]);
                        }
                    }
                }
            };
            if(this.cartInfo.length<1){
                this.cartInfoVisible = 0;
            }
        },
        removeFromCart:function(id){
            var newCart = [];
            for(i in window.localStorage.getItem('cart').split(',')){
                if(window.localStorage.getItem('cart').split(',')[i] !== String(id)){
                    newCart.push(window.localStorage.getItem('cart').split(',')[i]);
                }
            }
            window.localStorage.removeItem('cart');
            window.localStorage.setItem('cart',newCart.join());
            location.reload();
        },
        makeOrder:function(name = "-", cname = "-", pos = "-", city = "-", country = "-", tel = "-", email = "-", choose = "-", otherChoose = "-", interestedIn = "-", code = "-"){
            var order = [];
            order.push(name,cname,pos,city,country,tel,email,choose,otherChoose,interestedIn,code);
            this.contactField > 0 ? this.contactField.concat(order) : false;
            var form = document.querySelector('form > .row');
            form.classList.add('hidden');
            this.formVisible = 0;
            this.orderVisible = 1;
            window.localStorage.remove('cart');
        },   
    },
});
