import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const serverUrl = process.env.REACT_APP_HOST + '/api';
// const serverUrl = 'http://localhost:5000/api';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        groups: [],
        edited: []
      };

      this.updateData = this.updateData.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
      this.MakeEdits = this.MakeEdits.bind(this);
    }
    

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
        
      axios
        .get(serverUrl + "/groups")
        .then((groups) => {
            console.log(groups.data);
            this.setState({ groups: groups.data });
        })
        .catch((error) => {
            console.log(error);
        });
      
    }

    updateData(e) {
      console.log(this.state.items[e.target.className])
      const temp = this.state.items;

      temp[e.target.className][e.target.id] = e.target.value;

      this.setState({
        items: temp
      })
    }

    saveChanges() {
      this.state.edited.forEach((i) => {
        axios
          .patch(serverUrl + '/items', this.state.items[i])
          .then((res) => {
            window.location.reload();
          })

      })
    }

    MakeEdits(e) {
      const _id = e.target.value;

      const fields = document.getElementsByClassName(_id);

      [...fields].forEach((field) => {
        field.disabled = !field.disabled;
      })

      if (e.target.innerText === 'Edit') {
        e.target.innerText = "Finish"
        if(!this.state.edited.includes(_id)) {
          this.setState(prevEdit => ({edited: [...prevEdit.edited, _id]}))
        }
        console.log(this.state.edited);
      } else {
        e.target.innerText = "Edit"
      }
    }

    render() {
        function selectAll(e) {
          let checks = document.getElementsByClassName('item_id');

          if (e.target.checked) {
            [...checks].forEach((check) => {
              check.checked = true;
            })
          } else {
            [...checks].forEach((check) => {
              check.checked = false;
            })
          }
        }
    
        function deleteSelectedItems() {
          let item_ids = document.getElementsByClassName('item_id');

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
          let item_group = document.getElementById('item_group').value;

          axios.post(serverUrl + '/items', {
            name: item_name,
            stock: item_stock,
            group: item_group
          })
          .then(function (response) {
            // console.log(response);
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });

        }

        function addNewGroup() {
          let group_name = document.getElementById('group_name').value;
          axios.post(serverUrl + '/groups', {
            name: group_name,
          })
          .then(function (response) {
            // console.log(response);
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
        }

        let groups_dropdown = this.state.groups.map((group, index) => {
          return (
            <option value={this.state.groups[index].name}>{this.state.groups[index].name}</option>
          )
        })

        let inventoryTable = this.state.items.map((item, index) => {
            return (
              <tr>
                <td><input className='item_id' type='checkbox' value={this.state.items[index]._id}></input></td>
                <td><input id="name" className={index} type='text' value={this.state.items[index].name} onChange={this.updateData} disabled></input></td>
                <td><input id="stock" className={index} type='number' value={this.state.items[index].stock} onChange={this.updateData} disabled></input></td>
                <td><select id="group" className={index} value={this.state.items[index].group} onChange={this.updateData} disabled><option value="">No Group Selected</option>{groups_dropdown}</select></td>
                <td><button value={index} onClick={this.MakeEdits}>Edit</button></td>
              </tr>
            );
        });

        return (
            <div>
              <div>
                <input id='item_name' type='text' placeholder="Item Name"></input>
                <input id='item_stock' type='text' placeholder="Stock"></input>
                <select id='item_group'><option value="">No Group Selected</option>{groups_dropdown}</select>
                <button onClick={addNewItem}>Add New Item</button>
                <button onClick={deleteSelectedItems}>Delete Selected Items</button>
                <button onClick={this.saveChanges}>Save Edits</button>
              </div>
              <div>
                <input id='group_name' type='text' placeholder="Group Name"></input>
                <button onClick={addNewGroup}>Add New Group</button>
              </div>
              <table>
                <tbody>
                  <tr>
                    <th><input className='select_all' type='checkbox' onClick={selectAll}></input></th>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Group</th>
                  </tr>
                  {inventoryTable}
                </tbody>
              </table>
            </div>
        );
    }
}

export default App;
