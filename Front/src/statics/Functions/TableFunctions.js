//array, filterArray, filters
import axios from 'axios'
import swal from 'vue-sweetalert2';
import {
  Loading,
  QSpinnerGears
} from 'quasar'
/*---------------------------------- universal get method for tables  ----------------------------------------*/
function getItems(api) {
  Loading.show()
  this.tableLoading = true;
  axios
    .get(
      "/api/"+api
    )
    .then((response) => {
      this.tableLoading = false;
      this.data = response.data;
      Loading.hide()
    })
    .catch((error) => {
      if (error.response.status == 422) {
        this.$swal({
          title: "Error: "+error.response.status,
          text: error.response.data.message,
          icon: "error",
        });
        }
      this.tableLoading = false;
      //if user isnt logged he is pushed to login page
      if (error.response.status == 401) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');
        this.$router.push("/Login");
      }
      Loading.hide()
    });
  this.tableLoading = false;
}

/*---------------------------------- get method or statuses  ----------------------------------------*/

function getProjectStatuses() {
  axios
    .get("/api/projectStatuses")
    .then((response) => {
      this.projectStatuses = response.data;
    })
    .catch((error) => {
      if (error.response.status == 422) {
        this.$swal({
          title: "Error: "+error.response.status,
          text: error.response.data.message,
          icon: "error",
        });
        }
      //if user isnt logged he is pushed to login page
      if (error.response.status == 401) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');
        this.$router.push("/Login");
      }
    });
}

/*---------------------------------- universal update method for add and edit  ----------------------------------------*/

function updateTable(item) {
  let message = "";
  if (this.tempIndex != -1) {
    message = this.$t('editSuccess');
    this.data[this.data.indexOf(this.tempItem)] = item;
    this.tempIndex = -1;
    this.openEditDialog = false;
  } else {
    message = this.$t('addSuccess');
    this.data.push(item);
    this.openAddDialog = false;
  }
  this.$swal({
    icon: "success",
    title: message,
    timer: 1500,
  });
}

/*---------------------------------- universal delete method ----------------------------------------*/


function deleteItem(api,item) {
  this.$swal({
    title: this.$t('deleteConfirm'),
    showDenyButton: true,
    confirmButtonText: this.$t('deleteBtn'),
    denyButtonText: this.$t('cancelBtn'),
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Loading.show()
      axios
        .delete("/api/"+api+"/" + item.id)
        .then((response) => {
          this.data.splice(this.data.indexOf(item), 1);
          this.$swal({
            icon: "success",
            title: this.$t(api+'.deleted'),
            timer: 1500,
          });
          Loading.hide()
        })
        .catch((error) => {
           if (error.response.status == 422) {
          this.$swal({
            title: "Error: "+error.response.status,
            text: error.response.data.message,
            icon: "error",
          });
          }
          //if user isnt logged he is pushed to login page
          if (error.response.status == 401) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            this.$router.push("/Login");
          }
          Loading.hide()
        });
    }
  });
}

/*---------------------------------- universal add item method ----------------------------------------*/

function addItem(api) {

  //check if required fields are filled
  this.$refs.form.validate().then((success) => {
    if (success) {
      Loading.show()
      axios
        .post("/api/"+this.api, this.form)
        .then((response) => {
          this.$emit('itemAdded',response.data)
          Loading.hide()
        })
        .catch((error) => {
          if (error.response.status == 422) {
          this.$swal({
            title: "Error: "+error.response.status,
            text: error.response.data.message,
            icon: "error",
          });
          }
          //if user isnt logged he is pushed to login page
          if (error.response.status == 401) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            this.$router.push("/Login");
          }
          Loading.hide()
        });
    }
  });
}

/*---------------------------------- universal edit item method ----------------------------------------*/

function editItem(api) {
  //check if required fields are filled
  this.$refs.form.validate().then((success) => {
    if (success) {
      Loading.show()
      axios
        .put("/api/"+api+"/"+this.tempItem.id, this.form)
        .then((response) => {
          this.$emit('itemUpdated',response.data)
          Loading.hide()
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.$swal({
              title: "Error: "+error.response.status,
              text: error.response.data.message,
              icon: "error",
            });
            }
          //if user isnt logged he is pushed to login page
          if (error.response.status == 401) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            this.$router.push("/Login");
          }
          Loading.hide()
        });
    }
  });
}


export {
  getItems,
  getProjectStatuses,
  updateTable,
  deleteItem,
  addItem,
  editItem,

}
