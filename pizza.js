function Pizzacart() {
    return {
        title: 'Pizza Cart API',
        pizzas: [],
        username: 'saffah1910',
        cardID: '6o9Pu4u8zB',
        smallpizzacount: 0,
        mediumpizzacount: 0,
        largepizzacount: 0,
        total: 0,
        carttotal : 0,
        buy: false,
        payment: 0,
        successmessage: "",
        failuremessage: "",
        openpay: false,
        opencart: false,
        paymessage: false,
        opencheckout: true,
        cartPizzas: [],
        getCart() {
            const getCartUrl = 'https://pizza-api.projectcodex.net/api/pizza-cart/${this.cardID}/get'
            return axios.get(getCartUrl)
        },
        showCartData(){
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
                this.showCartData();
            
         
        },
        smallplus() {
            if (this.buy == true) {

                this.smallpizzacount += 49.00;
                this.total += 49.00
            }

        },
        smallminus() {
            if (this.smallpizzacount > 0 && this.buy == true) {

                this.smallpizzacount -= 49.00;
                this.total -= 49.00
            }

        },
        mediumplus() {
            if (this.buy == true) {
                this.mediumpizzacount += 89.00;
                this.total += 89.00
            }
        },
        mediumminus() {
            if (this.mediumpizzacount > 0 && this.buy == true) {

                this.mediumpizzacount -= 89.00;
                this.total -= 89.00
            }
        },
        largeplus() {
            if (this.buy == true) {
                this.largepizzacount += 120.00;
                this.total += 120.00
            }

        },
        largeminus() {
            if (this.largepizzacount > 0 && this.buy == true) {

                this.largepizzacount -= 120.00;
                this.total -= 120.00
            }
        },
        enoughmoney() {
            if (this.total <= this.payment) {

                this.successmessage = "Enjoy your pizza";
                this.paymessage = true;

                this.total = 0;
                this.smallpizzacount = 0;
                this.mediumpizzacount = 0;
                this.largepizzacount = 0;


            } else {
                this.paymessage = true;
                this.failuremessage = "Sorry - that is not enough money!";
                setTimeout(() => {
                    this.paymessage = false
                }, 3000);
            }
        },
        paybutton() {
            this.openpay = true;
            this.opencheckout = false;
        },

        buyPizza() {
            this.opencart = true;
            if (this.buy = true) {

                this.total += 49.00;
                this.smallpizzacount += 49.00;

            }
        },
        buyMediumPizza() {
            this.opencart = true;
            if (this.buy = true) {

                this.total += 89.00;
                this.mediumpizzacount += 89.00;

            }
        },
        buyLargePizza() {
            this.opencart = true;
            if (this.buy = true) {

                this.total += 120.00;
                this.largepizzacount += 120.00;
            }


        },
     
    }
}




document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCart', Pizzacart)

});
