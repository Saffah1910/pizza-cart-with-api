function Pizzacart() {
    return {
        title: 'Pizza Cart API',
        pizzas: [],
        username: 'saffah1910',
        cardID: '',
        carttotal: 0.00,
        paymentAmount: 0,
        cartPizzas: [],
        message: "",
        createCart() {
            const createCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`
            return axios.get(createCartURL)
                         .then(result => {
                             this.cardID = result.data.cart_code;

                });
        },
        getCart() {
            const getCartUrl = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cardID}/get`
            return axios.get(getCartUrl)
        },
        addPizza(pizzaId) {
            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add', {
                "cart_code": this.cardID,
                "pizza_id": pizzaId
            })

        },
        removePizza(pizzaId) {
            return axios.post(' https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
                "cart_code": this.cardID,
                "pizza_id": pizzaId
            })

        },
        pay(amount) {
            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/pay', {

                "cart_code": this.cardID,
                amount
            })
        },

        showCartData() {

            this.getCart().then(result => {
                const cartData = result.data;
                this.cartPizzas = cartData.pizzas;
                this.carttotal = cartData.total;
                // alert(
                //     this.carttotal
                // )
            })

        },
        init() {
            axios
                .get('https://pizza-api.projectcodex.net/api/pizzas')
                .then(result => {

                    console.log(result.data);
                    this.pizzas = result.data.pizzas
                });
            if (!this.cardID) {
                this
                    .createCart()
                    .then(() => {
                        this.cardID = result.data.cart_code; 
                        this.showCartData();
                    })
            }


        },
        addPizzaToCart(pizzaId) {
            // alert(pizzaId)
            this
                .addPizza(pizzaId)
                .then(() => {

                    this.showCartData()
                })
        },
        removePizzaFromCart(pizzaId) {
            this
                .removePizza(pizzaId)
                .then(() => {
                    this.showCartData()
                })


        },
        payForCart() {
            // alert("Pay now "+ this.paymentAmount)
            this
                .pay(this.paymentAmount)
                .then(result => {
                    if (result.data.status == "failure") {
                        this.message = result.data.message;
                        setTimeout(() => this.message = "", 3000)
                    }
                    else {
                        this.message = "Payment recieved";
                        setTimeout(() => {
                            this.message = "";
                            this.cartPizzas = [];
                            this.carttotal = 0.00;

                            this.paymentAmount = 0;
                            this.cardID = '';
                            this.createCart();
                        }, 3000)

                    }
                })
        },


    }
}



//17 11
document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCart', Pizzacart)

});
