
let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-el")
const tabEl = document.getElementById("tab-el")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)


if (leadsFromLocalStorage) {
   myLeads = leadsFromLocalStorage
   render(myLeads)
}


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
     listItems += `
        <li>
            <a target='_blank' href=${leads[i]}'>
            ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML  =   listItems 

}

tabEl.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })

  
})

deleteEl.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

btnEl.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

 
for (let i = 0; i < myLeads.length; i++) {
    const li = document.createElement("li")
    li.innerText = myLeads[i]
    ulEl.append(li)
}

