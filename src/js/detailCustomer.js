import { defineComponent } from "vue";

export default defineComponent({
  el: "#detailCustomer",
  name: "detailCustomer",
  data() {
    return {
      message: "",
      customer: [],
      customerId: this.$route.params.id,
      success: false,
      error: false,
      loading: false,
    };
  },
  created() {
    this.getCustomer()
  },
  methods: {
    async getCustomer () {
      try {
        const response = await fetch('/api/customers/' + `${this.customerId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        this.customer = await response.json()
      } catch(error) {
        console.log(error)
      }
    },
},
  mounted() {
    this.message = "Customer Details";
  },
});