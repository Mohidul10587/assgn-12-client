import { useQuery } from '@tanstack/react-query'
import React from 'react'



const Blog = () => {

  return (
    <div className='px-4 pt-24'>
      <h1 className='font-bold'>14.1 How will you improve the performance of a React Application?</h1>
      <p>Ans: We should make sure to use the production version when we deploy our app. Because in the development version react use many warnings to guide the developers to the right way but it make the app bigger and slower so we should use the production version</p>

      <h1 className='font-bold'>14.2 What are the different ways to manage a state in a React application?</h1>
      <p>Ans: We can use url , Web Storage ,Local State ,Lifted State ,Derived State</p>

      <h1 className='font-bold'>14.3 How does prototypical inheritance work ?</h1>
      <p>Ans: Assume that i have a object called  myObj and run is the method of myObj . Now i  create an another object called anotherObj using myObj . At this moment anotherObj can access all of the method of myObj . And we can call is like this anotherObj.run() .</p>
      <h1 className='font-bold'>14.4 Why you do not set the state directly in React. </h1>
      <p>Ans: </p>

      <h1 className='font-bold'>14.5 You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h1>
      <p>Ans:  First of all i catch the value of search input then . Then set in a state by clicking the on a button . Then i pass the value via fetch api to the backend . Then i extract the search value from prarams . Then i filter into the all products with startswith method.</p>
      <h1 className='font-bold'>14.6 What is a unit test? Why should write unit tests?</h1>
      <p>Ans: Unit Testing is a type of software testing where individual units or components of a software are tested. I helps us to make free our software from wrong input. </p>
    </div>
  )
}

export default Blog