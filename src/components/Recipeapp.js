import React, { Component } from 'react';
import axios from 'axios';


const APP_ID = "abc28316";
const APP_KEY = 'f60b7b912c5c7e68ebdf3d962b10ea52';
export class Recipeapp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            recipeName : '',
            recipeArr : [] ,
        }
    }
    recipeNameHandler = (e)=>{
        this.setState({
            recipeName : e.target.value
        })
    }

    getRecipes = (e)=>{
        e.preventDefault();
        axios.get(`https://api.edamam.com/search?q=${this.state.recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(res => this.setState({recipeArr : res.data.hits}))
        .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div className='container'>
                <header className='head'>
                    <h1>Recipe App</h1>
                </header>
                <form className='search-form' onSubmit={this.getRecipes}>
                    <input type='text' value={this.state.recipeName} onChange={this.recipeNameHandler} className='input-search' name='search-value' placeholder='eg.Chicken'/>
                    <button className='btn' type='submit'>Search</button>
                </form>
                <div className='result-container'>
                    {
                        this.state.recipeArr.map((recipe, index) => {
                            return (      
                                <div className='recipe' key={index}>
                                    <img src={recipe.recipe.image} alt='recipe'/>
                                    <h2>{recipe.recipe.label.length < 15? recipe.recipe.label : `${recipe.recipe.label.substring(0,15)}...`}</h2>
                                    <p>Source : {recipe.recipe.source}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Recipeapp
