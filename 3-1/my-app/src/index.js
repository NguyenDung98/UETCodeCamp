import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Header extends React.Component {
    static items = [];

    constructor(props) {
        super(props);
        this.inputElement = "";
        this.item = "";
    }

    onInputChange(refName) {
        this.inputElement = this.refs[refName];
        this.item = this.inputElement.value;
    }

    addElement = () => {
        if (this.inputElement.value) {
            Header.items.push(this.item);
            this.inputElement.value = "";
            ReactDOM.render(
                <List/>,
                document.getElementById("container")
            );
        }
    };

    handlePressed = (event) => {  // 'this' returns back to its parent
        if (event.which === 13) {
            this.addElement();
        }
    };

    render() {
        return (
            <div className="pb-5" id="title">
                <h1 className="text-center pt-4">My To Do List</h1>
                <div className="row">
                    <div className="offset-1 col-8 p-0">
                        <input ref='todo_text'
                               className="w-100 h-100 pl-2"
                               type="text"
                               placeholder="Title..."
                               onChange={() => {
                                   this.onInputChange('todo_text')
                               }}
                               onKeyPress={this.handlePressed}
                        />
                    </div>
                    <button onClick={this.addElement} className="col-2 h-100" id="add-btn">Add</button>
                </div>
            </div>
        )
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.isDone = false;
    }

    handleClick(refName) {
        this.isDone = !this.isDone;
        this.refs[refName].classList.toggle("done");
        ReactDOM.render(
            <List/>,
            document.getElementById("container")
        );
    };

    isDoneClasses() {
        const classesName = "col-1 my-2";
        if (this.isDone) return classesName;
        else return classesName + " d-none";
    }

    contentClasses() {
        const classesName = "col-10";
        if (this.isDone) return classesName;
        else return classesName + " offset-1";
    }

    deleteItem(ref) {
        this.refs[ref].parentElement.remove();
        ReactDOM.render(
            <List/>,
            document.getElementById("container")
        );
    }

    render() {
        return (
            <div ref="item" onClick={() => this.handleClick("item")} className="row mx-0" >
                <div className={this.isDoneClasses()}>
                    <i className="fas fa-check"/>
                </div>
                <div className={this.contentClasses()}>
                    <p className="my-2">{this.props.content}</p>
                </div>
                <div ref="deleteBtn" onClick={() => this.deleteItem("deleteBtn")} className="col-1 p-0">
                    <button className="h-100 w-100 btn-delete">
                        <i className="fas fa-times"/>
                    </button>
                </div>
            </div>
        )
    }
}

class List extends React.Component {
    createItems() {
        let newItems = [];
        Header.items.map(function (content, index) {
            newItems.push(
                <Item key={index} content={content}/>
            );
        });
        return newItems;
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="list">
                    {this.createItems()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById("container")
);

registerServiceWorker();