var io = io()
var socket = io.connect('http://localhost:3000')
window.onload = function(){
    //server에 유저 이름을 보내주기 위한 입력
    var name = prompt('Type your name')
    var roomName = prompt('room name?')
    //전송
    socket.emit('join', {roomName : roomName})
    socket.emit('updateMessage', {comment:name})
    //데이터 받는 함수
    socket.on('updateMessage', function(data){
        var body = document.querySelector('#body')
        var p = document.createElement('p')
        body.appendChild(p)
        p.style.fontFamily = 'fantasy'
        p.innerHTML = data.message

    })
    socket.on('message', function(data){
        var body = document.querySelector('#body')
        var p = document.createElement('div')
        body.appendChild(p)
        p.style.backgroundColor = '#ADE23F'
        p.style.borderRadius = '10px 100px 100px 100px'
        p.innerHTML = data.message
    })


    var menu_btn = document.getElementById('menu-button')
    var menu_remove_btn = document.getElementById('remove-menu')
    menu_btn.addEventListener('click', menu)
    menu_remove_btn.addEventListener('click', removeMenu)
    document.addEventListener('keyup', send)

    function send(event){ 
        if(event.keyCode == '13'){
        var input = document.getElementById("text")
        var text = input.value
        console.log(text)
        var body = document.querySelector('#body')
        var p = document.createElement('div')
        body.appendChild(p)
        p.innerHTML = text
        input.value = ''

        //서버로 메세지 전송
        socket.emit('SEND',{
            name: name,
            message : text
        })
        window.scrollTo({top:body.offsetTop, behavior:'smooth'})
 
        }
    }
    function menu(event){
        var menu = document.getElementById('menu')
        console.log('hello')
        menu.style.display = 'block'
    }
    function removeMenu(event){
        var menu = document.getElementById('menu')
        menu.style.display = 'none'
    }
    socket.on('recMsg', function(data){
        var body = document.querySelector('#body')
        var p = document.createElement('div')
        body.appendChild(p)
        p.style.backgroundColor = '#ADE23F'
        p.style.borderRadius = '10px 100px 100px 100px'

    })
    
}