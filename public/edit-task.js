// const taskIDDOM = document.querySelector('.task-edit-id')
// const taskNameDOM = document.querySelector('.task-edit-name')
// const taskCompletedDOM = document.querySelector('.task-edit-completed')
// const editFormDOM = document.querySelector('.single-task-form')
// const editBtnDOM = document.querySelector('.task-edit-btn')
// const formAlertDOM = document.querySelector('.form-alert')
// const params = window.location.search
// const id = new URLSearchParams(params).get('id')
// let tempName

// const showTask = async () => {
//   try {
//     const {
//       data: { task },
//     } = await axios.get(`/api/v1/tasks/${id}`)
//     const { _id: taskID, completed, name } = task

//     taskIDDOM.textContent = taskID
//     taskNameDOM.value = name
//     tempName = name
//     if (completed) {
//       taskCompletedDOM.checked = true
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// showTask()

// editFormDOM.addEventListener('submit', async (e) => {
//   editBtnDOM.textContent = 'Loading...'
//   e.preventDefault()
//   try {
//     const taskName = taskNameDOM.value
//     const taskCompleted = taskCompletedDOM.checked

//     const {
//       data: { task },
//     } = await axios.patch(`/api/v1/tasks/${id}`, {
//       name: taskName,
//       completed: taskCompleted,
//     })

//     const { _id: taskID, completed, name } = task

//     taskIDDOM.textContent = taskID
//     taskNameDOM.value = name
//     tempName = name
//     if (completed) {
//       taskCompletedDOM.checked = true
//     }
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.textContent = `success, edited task`
//     formAlertDOM.classList.add('text-success')
//   } catch (error) {
//     console.error(error)
//     taskNameDOM.value = tempName
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.innerHTML = `error, please try again`
//   }
//   editBtnDOM.textContent = 'Edit'
//   setTimeout(() => {
//     formAlertDOM.style.display = 'none'
//     formAlertDOM.classList.remove('text-success')
//   }, 3000)
// })



const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskDateDOM = document.querySelector('.task-edit-date')
const taskTimeDOM = document.querySelector('.task-edit-time')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, completed, name, dueDate, dueTime } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    taskDateDOM.value = new Date(dueDate).toISOString().split('T')[0]
    taskTimeDOM.value = dueTime
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked
    const taskDate = taskDateDOM.value
    const taskTime = taskTimeDOM.value

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
      dueDate: taskDate,
      dueTime: taskTime
    })

    const { _id: taskID, completed, name } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    if (error.response && error.response.status === 409) {
      formAlertDOM.innerHTML = `Warning: ${error.response.data.message}`
      formAlertDOM.classList.add('text-warning')
    } else {
      formAlertDOM.innerHTML = `error, please try again`
    }
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success', 'text-warning')
  }, 3000)
})