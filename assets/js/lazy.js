// display content when it is loaded
const main_content = document.getElementById('main_content')
const loading_content = document.getElementById('loading_skeleton')

addEventListener('DOMContentLoaded', () => {
    loading_content.remove()
    main_content.style.visibility = 'visible'

})