import React, { Component } from "react";
import axios from "axios";
import "./App.css";

// const serverUrl = process.env.REACT_APP_HOST + '/api';
const serverUrl = 'http://localhost:5000/api';

class App extends Component {
    state = {
      items: [],
    };

    componentDidMount() {
        axios
            .get(serverUrl + "/items")
            .then((items) => {
                console.log(items.data);
                this.setState({ items: items.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        function deleteSelectedItems() {
          let item_ids = document.getElementsByClassName('item_id');
          let del_ids = [];

          [...item_ids].forEach((item_id) => {
            if (item_id.checked) {
              console.log("DELETING id: " + item_id.value)
              axios
                .delete(serverUrl + "/items", {data: { _id: item_id.value }})
                .then(() => {
                  window.location.reload();
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          })
        }

        function addNewItem() {
          let item_name = document.getElementById('item_name').value;
          let item_stock = document.getElementById('item_stock').value;

          axios.post(serverUrl + '/items', {
            name: item_name,
            stock: item_stock
          })
          .then(function (response) {
            // console.log(response);
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });

        }

        let inventoryTable = this.state.items.map((item) => {
            return (
              <tr>
                <td><input className='item_id' type='checkbox' value={item._id}></input></td>
                <td><input className='item_id' type='text' value={item.name} disabled></input></td>
                <td><input className='item_id' type='text' value={item.stock} disabled></input></td>
              </tr>
            );
        });

        return (
            <div>
              <input id='item_name' type='text' placeholder="Item Name"></input>
              <input id='item_stock' type='text' placeholder="Stock"></input>
              <button onClick={addNewItem}>Add New Item</button>
              <button onClick={deleteSelectedItems}>Delete Selected Items</button>
              <table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Stock</th>
                  </tr>
                  {inventoryTable}
                </tbody>
              </table>
            </div>
        );
    }
}

export default App;
