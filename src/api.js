import axios from "axios";

export default {
    getProduct: function(){
        return axios.get("https://qa-reistry-interview-api.regsvcs.theknot.com/products");
    }
}