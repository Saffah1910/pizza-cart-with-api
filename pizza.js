function Pizzacart() {
    return {
        title: 'Pizza Cart API',
        pizzas: [],
        username: '',
        cardID: '',
        carttotal: 0.00,
        paymentAmount: 0,
        cartPizzas: [],
        failuremessage: "",
        successmessage: "",
       
        login() {
            if (this.username.length > 2) {
                localStorage['username'] = this.username;
                console.log(this.username)

                this.createCart()
            } else {
                alert("username is too short")
            }

        },
        logout() {
            if (confirm(this.username + " are you sure you want to logout ?")) {
                this.username = '';
                this.cardID = '';
                localStorage['cardId'] = '';
                localStorage['username'] = '';


            }

        },
        createCart() {
            if (!this.username) {
                // this.cardID = "No usrname to create a cart for"
                return Promise.resolve();
            }
            const createCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`
            const cardId = localStorage['cardId'];
            console.log(this.cardID)
            if (cardId) {
                this.cardID = cardId;
                return Promise.resolve();
            }
            else {
                return axios.get(createCartURL)
                    .then(result => {
                        this.cardID = result.data.cart_code;
                        localStorage["cardId"] = this.cardID;

                    });
            };
        },
        getCart() {
            const getCartUrl = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cardID}/get`
            return axios.get(getCartUrl)
        },
        addPizza(pizzaId) {
            
            alert( this.pizza.flavour + " " + this.pizza.size + " has been added to your cart")
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
                amount,
               
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
            const storedUserName = localStorage['username'];
            if (storedUserName) {
                this.username = storedUserName
            };

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
                        this.failuremessage = result.data.message;
                        setTimeout(() =>
                         this.failuremessage = "", 3000)
                    }
                    else {

                        this.successmessage = "Payment recieved enjoy you meal !!";
                     

                        setTimeout(() => {
                            this.successmessage = "";
                            this.cartPizzas = [];
                            this.carttotal = 0.00;
                            localStorage['cardId'] = '';
                            localStorage['username'] = ''
                            this.paymentAmount = 0;
                            this.cardID = '';
                            this.username = ''


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
