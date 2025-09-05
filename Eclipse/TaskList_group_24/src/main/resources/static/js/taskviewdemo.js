/**
 * For testing the functionality of taskview.js
 */

class TaskViewDemo {
/**
    #tasklist
    #taskview

    constructor() {
        this.#taskview = document.querySelector("task-view");
        this.#tasklist = this.#taskview.shadowRoot.querySelector("task-list");

        this.#tasklist.addChangestatusCallback(
            (id, newStatus) => {
                console.log(`Status ${newStatus} for task ${id} approved`)
            }
        );

        this.#tasklist.addDeletetaskCallback(
            (id) => {
                console.log(`Delete of task ${id} approved`)
            }
        );

        const allstatuses = ["WAITING", "ACTIVE", "DONE"];
        this.#tasklist.setStatuseslist(allstatuses);
        const tasks = [
            {
                id: 1,
                status: "WAITING",
                title: "Paint roof"
            },
            {
                id: 2,
                status: "ACTIVE",
                title: "Wash windows"
            },
            {
                id: 3,
                status: "DONE",
                title: "Wash floor"
            }
        ];

        for (let t of tasks) {
            this.#tasklist.showTask(t);
        }
    }

    newtask(id, title, status) {
        const newtask = {
            "id": id,
            "title": title,
            "status": status
        };
        this.#tasklist.showTask(newtask);
    }

    changestatus(id, status) {
        const newstatus = {
            "id": id,
            "status": status
        };
        this.#tasklist.updateTask(newstatus);
    }

    removetask(id) {
        this.#tasklist.removeTask(id);
    }
        */
}

//window.addEventListener('DOMContentLoaded', () => {
/**
const demo = new TaskViewDemo();
demo.changestatus(1, "ACTIVE");
demo.newtask(5,"Do DAT152 home work","ACTIVE");
demo.removetask(1) ;
//});
*/