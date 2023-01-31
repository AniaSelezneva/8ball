import React, { useState, useRef } from "react"
import * as styles from "../styles.module.scss"

function Input({ setQuestionAsked }) {
  const [question, setQuestion] = useState("")
  const [savedQuestion, setSavedQuestion] = useState("")
  const input = useRef()
  const [questionSent, setQuestionSent] = useState(false)

  return (
    <form className={styles.form}>
      <div>
        <input
          ref={input}
          value={question}
          autocomplete="off"
          placeholder='Your YES/NO question'
          type="text"
          name="name"
          id="name"
          required
          onChange={e => {
            setQuestion(e.target.value)
          }}
        ></input>
        <button
          onClick={async e => {
            e.preventDefault()

            if (question.trim().length > 0) {
              setQuestionAsked(true)
              setQuestionSent(true)
              setSavedQuestion(question)
              setQuestion("")
              try {
                await sendQuestionToServer(question)
              } catch (error) {
                console.log(error)
              }
            }
          }}
        >
          Ask
        </button>
        <p style={{ visibility: questionSent ? "visible" : "hidden" }}>
          Your question was: {savedQuestion}
        </p>
      </div>
    </form>
  )
}

export default Input
