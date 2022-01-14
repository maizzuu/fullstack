import React from 'react'
import Header from './Header'
import Part from './Part'
import Content from './Content'

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}></Header>
            <Content parts={course.parts}></Content>
        </div>
    )
}

export default Course