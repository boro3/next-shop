import React, { Component } from 'react'
import { detailProduct, storeProducts } from './data'

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        inCart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        this.setProduct();
    }

    setProduct = () => {
        let products = [];
        storeProducts.map(item => {
            const singleItem = { ...item };
            products = [...products, singleItem];
            return null;
        })
        this.setState({
            products: products
        })
    }

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState({
            detailProduct: product
        })
    }

    addProductToCart = (id) => {
        let product = this.getItem(id)
        product.inCart = !product.inCart
        product.count = 1;
        product.total = product.price * product.count;
        return (product)
    }

    addToCart = (id) => {
        let temProduct = this.addProductToCart(id)
        this.setState({
            products: [...this.state.products.map((product) => {
                return (product.id === id ? temProduct : product)
            })],
            inCart: [...this.state.inCart, temProduct]
        }, () => this.makeBill())
    }

    openModal = id => {
        let product = this.getItem(id);
        this.setState({
            modalProduct: product,
            modalOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }

    increment = (id) => {
        let item = this.getItem(id);
        item.count += 1;
        item.total = item.price * item.count;
        this.makeBill();
    }

    decrement = (id) => {
        let item = this.getItem(id);
        if (item.count - 1 > 0) {
            item.count -= 1;
            item.total = item.price * item.count;
            this.makeBill();
        } else {
            this.removeItem(id);
        }
    }

    removeItem = (id) => {
        let tempItem = this.getItem(id);
        tempItem.inCart = false;
        tempItem.count = 0;
        tempItem.total=0;
        this.setState({
            inCart: [...this.state.inCart.filter(item => {
                return (tempItem.id !== item.id)
            })]
        }, () => this.makeBill())
    }

    clearCart = () => {
        this.setState({
            inCart: []
        },()=>{
            this.setProduct()
            this.makeBill()
        })

    }

    makeBill = () => {
        let subTotal = 0
        let tax = 0
        this.state.inCart.map(item => {
            subTotal += item.total;
            return null
        })
        tax = subTotal * 0.18
        this.setState({
            cartSubTotal: subTotal,
            cartTax: tax.toFixed(2),
            cartTotal: (tax + subTotal).toFixed(2)
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                clearCart: this.clearCart,
                removeItem: this.removeItem,
                decrement: this.decrement,
                increment: this.increment,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
