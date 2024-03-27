import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EXPRESS_URL } from "../../config/configuration";
import { AES, enc } from "crypto-js";
const secretPass = "wfiyfryefv";

const duePaymentSlice = createSlice({
  name: "customers",
  initialState: {
    customers: {},
    isLoaded: false,
  },
  reducers: {
    fetch: (state, param) => {
      return {
        ...state,
        isLoaded: true,
        customers: param.payload,
      };
    },
  },
});

// Actions

export const { fetch } = duePaymentSlice.actions;
export default duePaymentSlice.reducer;

export const fetchAllCustomers = () => (dispatch) => {
  let customerData = [];
  axios
    .get(EXPRESS_URL + "api/customers")
    .then((response) => {
      response.data.map((customer) => {
        let obj = {
          firstName: JSON.parse(
            AES.decrypt(customer.firstName, secretPass).toString(enc.Utf8)
          ),
          lastName: JSON.parse(
            AES.decrypt(customer.lastName, secretPass).toString(enc.Utf8)
          ),
          email: obj.email,
          phone: obj.phone,
        };
        customerData.push(obj);
      });

      dispatch(fetch(customerData));
    })
    .catch((error) => console.log(error));
};