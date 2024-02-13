import { useState } from "react";

import classnames from "classnames";

import "./App.css";
import shoppingIcon from './assets/shopping-icon.svg';
import plusIcon from './assets/plus-icon.svg';
import minusIcon from './assets/minus-icon.svg';

function App() {

  //state untuk menyimpan nilai input
  const [value, setValue] = useState('')

  //state untuk menyimpan nilai todos
  const [todos,setTodos] = useState([
    // {title:'Susu Ultra', count:1},
    // {title:'Tahu Sumedang', count:1},
    // {title:'Semangka', count:1},

  ])

  //untuk submit todos baru dari form input
  const handleSubmit = (e) =>{
    //berguna untuk mengatasi behavior dari submit yang biasanya langsung refresh
    e.preventDefault()

    //jika kosong maka akan mengeluarkan alert dan skip perintah dibawah nya
    if(!value){
      alert("List is blank")
      return
    }
    
    const adddedTodos = [...todos,{
      title : value,
      count : 1
    }]

    setTodos(adddedTodos)
    setValue('')
  }

  //untuk button plus
  const handlePlusButtonAction = (index) =>{
    //Membuat variable baru yang isinya todos
    const newTodos = [...todos]

    //berdasarkan index yang ada, maka count akan ditambah 1
    newTodos[index].count = newTodos[index].count + 1

    //kemudian set state dengan nilai todos yang baru
    setTodos(newTodos)
  }
  
  //untuk minus plus
  const handleMinusButtonAction = (index) =>{
    //Membuat variable baru yang isinya todos
    const newTodos = [...todos]

    //berdasarkan index yang ada, maka count akan dikurang 1
    if(newTodos[index].count > 0){
      //Selama jumlah count masih di atas 0
      //Bisa lakukan pengurangan
      newTodos[index].count = newTodos[index].count - 1
    }
    else{
      //kalo udah 0 dan masih dikurangin juga
      //Hapus array value dengan index yang sesuai
      newTodos.splice(index, 1)
    }

    //kemudian set state dengan nilai todos yang baru
    setTodos(newTodos)
  }

  const getTotalCounts = () =>{
    const totalCounts = todos.reduce((total,num)=>{
      return total + num.count
    }, 0) 

    return totalCounts
  }

  return (
    //REACT FRAGMENT ADALAH CARA MEN WRAP 2 ELEMENT ATAU LEBIH TANPA MEMBUAT DIV
    <>
      <nav className="nav">
        <img className="nav-icon" src={shoppingIcon} alt="Shopping Icon"/>
        <h1 className="nav-title">Shopping List</h1>
      </nav>

      <section className="container">
        <form className="form" onSubmit={handleSubmit}>
          <input
          onChange={(event)=>{
            //berguna untuk mengambil nilai dari input ini
            setValue(event.target.value)
          }}
          value={value}
          className="input"
          type="text"
          placeholder="List"
          />
          <button className="add-button" onSubmit={()=>{

          }} type="submit">add</button>
        </form>
        <div className="info">
          <div className="info-total">
            <p>{`Total List : ${todos.length}`}</p>
          </div>
          <div className="info-total">
            <p>{`Total Counts : ${getTotalCounts()}`}</p>
          </div>

          <button onClick={()=>{setTodos([])}} className="delete-all-button">
            Delete All List
          </button>
        </div>

        {/* bagian ini untuk menampilkan todo listnya yang datanya berasal
        dari state todo diatas, kemudian dicetak dengan menggunakan map function
        */}
        {/* jika data pada todos lebih dari 0 maka akan ditampilkan
        jika tidak ada, maka akan menampilkan "Wah kosong nih" */}
        {
          todos.length > 0 ? (
            <div className="todos">
              {todos.map((todo, index, arr)=>{
                return (
                  //maksud dari ekspression dibawah adalah
                  //selama dia bukan lah elemen terakhir maka akan ditambahkan class todo-divider
                  <div key={index} className={`todo ${!(arr.length === index + 1) && 'todo-divider'}`}>
                    
                    {todo.title}

                    <div className="todo-icon-wrapper">
                      <div className="todo-count">{todo.count}</div>

                      <button onClick={()=> handleMinusButtonAction(index)} className="todo-action-button">
                        <img src={minusIcon} alt="minus icon"/>
                      </button>

                      <button onClick={()=> handlePlusButtonAction(index)} className="todo-action-button">
                        <img src={plusIcon} alt="plus icon"/>
                      </button>
                    </div>

                  </div>
                )
              })}
            </div>
          )
          :
          (
            <div>
              <p>Your List Still Empty</p>
            </div>
          )
        }
      </section>
    </>
  );
}

export default App;
