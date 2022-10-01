 ///////////////////// STORE CLASS //////////////////////////

class Store {
	static roster = {};
    static rosters = [];
	
	static getRosters() {
    
      if (localStorage.getItem("rosters") == null) {
		  
         Store.roster = new Roster(
          "Empty",
          "00:00",
          "00:00",
          "00:00",
          0,
          0,
          0,
          [],
          [],
          [],
          []
        );
        Store.rosters = [Store.roster];
      } else {
        Store.rosters = JSON.parse(localStorage.getItem("rosters"));
      }
      return Store.rosters;
    }
  
    static addRoster(newRoster) {
      const rosters = Store.getRosters();
      rosters.push(newRoster);
      localStorage.setItem("rosters", JSON.stringify(rosters));
    }
  
    static removeRoster(name) {
      const rosters = Store.getRosters();
      rosters.forEach((roster, index) => {
        if (roster.name == name) {
          rosters.splice(index, 1);
        }
      });
      localStorage.setItems("rosters", JSON.stringify(rosters));
    }
  }

  //////////////////END OF CLASS STORE //////////////////////


  ////////////// CLASS ROSTER //////////////////////////////
  
  class Roster {
    constructor(
      name,
      timePreSelect,
      timeOpenSelect,
      timeCloseSelect,
      countHeadPre,
      countHeadOpen,
      countHeadClose,
      shiftsPre,
      shiftsOpen,
      shiftsClose,
      labourPerHour
    ) {
      (this.name = name),
        (this.timePreSelect = timePreSelect),
        (this.timeOpenSelect = timeOpenSelect),
        (this.timeCloseSelect = timeCloseSelect),
        (this.countHeadPre = countHeadPre),
        (this.countHeadOpen = countHeadOpen),
        (this.countHeadClose = countHeadClose),
        (this.shiftsPre = shiftsPre),
        (this.shiftsOpen = shiftsOpen),
        (this.shiftsClose = shiftsClose),
        (this.labourPerHour = labourPerHour);
    }
	setRosterName(name){
		this.name = name;
	}
    setTimePreSelect(time) {
      this.timePreSelect = time;
    }
    setTimeOpenSelect(time) {
      this.timeOpenSelect = time;
    }
    setTimeCloseSelect(time) {
      this.timeCloseSelect = time;
    }
    setCountHeadPre(time) {
      this.countHeadPre = time;
    }
    setCountHeadOpen(time) {
      this.countHeadOpen = time;
    }
    setCountHeadClose(time) {
      this.countHeadClose = time;
    }
    setShiftsPre(shift) {
      this.shiftsPre.push(shift);
    }
    setShiftsOpen(shift) {
      this.shiftsOpen.push(shift);
    }
    setShiftsClose(shift) {
      this.shiftsClose.push(shift);
    }
    setShiftsPreFrom(id, time) {
      this.shiftsPre.forEach((shift) => {
        shift.id == id ? (shift.from = time) : shift.from;
      });
    }
    setShiftsOpenFrom(id, time) {
      this.shiftsOpen.forEach((shift) => {
        shift.id == id ? (shift.from = time) : shift.from;
      });
    }
    setShiftsCloseFrom(id, time) {
      this.shiftsClose.forEach((shift) => {
        shift.id == id ? (shift.from = time) : shift.from;
      });
    }
    setShiftsPreTo(id, time) {
      this.shiftsPre.forEach((shift) => {
        shift.id == id ? (shift.to = time) : shift.to;
      });
    }
    setShiftsOpenTo(id, time) {
      this.shiftsOpen.forEach((shift) => {
        shift.id == id ? (shift.to = time) : shift.to;
      });
    }
    setShiftsCloseTo(id, time) {
      this.shiftsClose.forEach((shift) => {
        shift.id == id ? (shift.to = time) : shift.to;
      });
    }
    removeShiftsPre(id) {
      this.shiftsPre.forEach((shift, index) => {
        id == shift.id ? this.shiftsPre.splice(index, 1) : shift;
      });
    }
    removeShiftsOpen(id) {
      this.shiftsOpen.forEach((shift, index) => {
        id == shift.id ? this.shiftsOpen.splice(index, 1) : shift;
      });
    }
    removeShiftsClose(id) {
      this.shiftsClose.forEach((shift, index) => {
        id == shift.id ? this.shiftsClose.splice(index, 1) : shift;
      });
    }
    setPositionShiftsPre(id, position) {
      this.shiftsPre.forEach((shift, index) => {
        id == shift.id ? (shift.position = position) : shift.position;
      });
    }
    setPositionShiftsOpen(id, position) {
      this.shiftsOpen.forEach((shift, index) => {
        id == shift.id ? (shift.position = position) : shift.position;
      });
    }
    setPositionShiftsClose(id, position) {
      this.shiftsClose.forEach((shift, index) => {
        id == shift.id ? (shift.position = position) : shift.position;
      });
    }
    setHoursShiftsPre(id, hours) {
      this.shiftsPre.forEach((shift, index) => {
        id == shift.id ? (shift.hours = hours) : shift.hours;
      });
    }
    setHoursShiftsOpen(id, hours) {
      this.shiftsOpen.forEach((shift, index) => {
        id == shift.id ? (shift.hours = hours) : shift.hours;
      });
    }
    setHoursShiftsClose(id, hours) {
      this.shiftsClose.forEach((shift, index) => {
        id == shift.id ? (shift.hours = hours) : shift.hours;
      });
    }
    setLabourPerHour(num){
      this.labourPerHour = Array(num).fill(0);
    }
    updateLabourPerHour(arr){
      this.setLabourPerHour(this.countHeadOpen);
      //console.log(arr);
      this.shiftsOpen.forEach((shift)=>{
        //console.log(shift.from, shift.to);
        let start = arr.indexOf(shift.from);
        let end = arr.indexOf(shift.to);
        //console.log(start, end);
        this.labourPerHour.forEach((hour, i)=>{
            i >= start && i < end ? this.labourPerHour[i] = hour += 0.5 : 0;
        });
      });
      //console.log(this.labourPerHour);
    }
	
    getLabourPerHour(){
      return this.labourPerHour;
    }
  }
  
  //////////////// END OF CLASS ROSTER /////////////////////
  
  //////////////// CLASS SHIFT /////////////////////////////
  
  class Shift {
    constructor(id, employee, position, from, to, pause, hours) {
      this.id = id;
      this.employee = employee;
      this.position = position;
      this.from = from;
      this.to = to;
      this.break = pause;
      this.hours = hours;
    }
  }
  
  /////// START OF UI CLASS ////////////////
  
  class UI {
	  
    static countHeadPre = 0;
    static countHeadOpen = 0;
    static countHeadClose = 0;
    static newRoster;
	static rosters = [];
  
    static StoredPositions = [
      "Cook",
      "Cashtill",
      "Packer",
      "Presenter",
      "Manager SM",
      "Manager RGM",
      "Manager ARGM",
      "Middle Station"
    ];
	  
    ////////////////COLOR POSITIONS /////////////////////////////////
    static colorPosition(position, el) {
      position == "Cook" ? (el.style.background = "#ff595e") : null;
      position == "Cashtill" ? (el.style.background = "#eccf1c") : null;
      position == "Packer" ? (el.style.background = "#8ac926") : null;
      position == "Presenter" ? (el.style.background = "#6a4c93") : null;
      position == "Manager SM" ? (el.style.background = "#f77f00") : null;
      position == "Manager RGM" ? (el.style.background = "#99582a") : null;
      position == "Manager ARGM" ? (el.style.background = "#f15bb5") : null;
      position == "Middle Station" ? (el.style.background = "#1982c4") : null;
    }
  
	//////////////////// DISPLAY ROSTER /////////////////////////////////////
    static displayRoster(name = 'Empty') {
      const positions = UI.StoredPositions;	
      UI.rosters = Store.getRosters().filter((roster)=>{return roster.name == name});
		//console.log(UI.rosters);
      UI.rosters.forEach((roster) => {
 			UI.newRoster = new Roster(
		  roster.name,
          roster.timePreSelect,
          roster.timeOpenSelect,
          roster.timeCloseSelect,
          roster.countHeadPre,
          roster.countHeadOpen,
          roster.countHeadClose,
          roster.shiftsPre,
          roster.shiftsOpen,
          roster.shiftsClose,
          roster.labourPerHour 	
		  );
       // console.log(UI.newRoster);
		
		UI.rosterNames(Store.getRosters(), 'roster-template-select', roster.name);
		  
        UI.addTimesRuler(
          UI.newRoster.timePreSelect,
          UI.newRoster.countHeadPre,
          "red",
          "time-pre-head",
          "total-pre"
        );
        UI.addTimesRuler(
          UI.newRoster.timeOpenSelect,
          UI.newRoster.countHeadOpen,
          "green",
          "time-open-head",
          "total-open"
        );
        UI.displayLabourHours(
          UI.newRoster.getLabourPerHour(),
          'orange',
          'labour-hours-open-head'
        );
        UI.addTimesRuler(
          UI.newRoster.timeCloseSelect,
          UI.newRoster.countHeadClose,
          "blue",
          "time-close-head",
          "total-close"
        );
        UI.addTimeSlots("time-pre-select");
        UI.addTimeSlots("time-open-select");
        UI.addTimeSlots("time-close-select");
        UI.addShiftToRoster(
          UI.newRoster.shiftsPre,
          "pre-row",
          UI.newRoster.timePreSelect,
          UI.newRoster.countHeadPre,
          positions
        );
        UI.addShiftToRoster(
          UI.newRoster.shiftsOpen,
          "open-row",
          UI.newRoster.timeOpenSelect,
          UI.newRoster.countHeadOpen,
          positions
        );
        UI.addShiftToRoster(
          UI.newRoster.shiftsClose,
          "close-row",
          UI.newRoster.timeCloseSelect,
          UI.newRoster.countHeadClose,
          positions
        );
        UI.countHeadPre = UI.newRoster.countHeadPre;
        UI.countHeadOpen = UI.newRoster.countHeadOpen;
        UI.countHeadClose = UI.newRoster.countHeadClose;
        document.getElementById("time-pre-select").value =
          UI.newRoster.timePreSelect;
        document.getElementById("time-open-select").value =
          UI.newRoster.timeOpenSelect;
        document.getElementById("time-close-select").value =
          UI.newRoster.timeCloseSelect;
      });
    }
	
	////////////////////// END OF DISPLAY ROSTER ///////////////////////
	
  
    //ADD SHIFT
    static addShiftToRoster(shifts, el, s, e, positions) {
      shifts.map((shift, index) => {
		  let hours = "";
        //TABLE CELLS
        let cellDataFrom = document.createElement("td");
        let cellDataTo = document.createElement("td");
        let cellDataPosition = document.createElement("td");
        let cellDataDelete = document.createElement("td");
  
        //SELECTS
        let selectElementFrom = document.createElement("select");
        let selectFromWrapper = document.createElement("div");
        selectFromWrapper.classList.add('select');
        selectFromWrapper.classList.add('width1');
        selectElementFrom.classList.add("from");

        let selectElementTo = document.createElement("select");
        let selectToWrapper = document.createElement("div");
        selectToWrapper.classList.add('select');
        selectToWrapper.classList.add('width1');
        selectElementTo.classList.add("to");

        let selectElementPosition = document.createElement("select");
        let selectPositionWrapper = document.createElement("div");
        selectPositionWrapper.classList.add('select');
        selectElementPosition.classList.add("position");
  
        //TABLE ROW
        let tableRowElement = document.createElement("tr");
        tableRowElement.id = shift.id;
  
        //DELETE BTN
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "X";
        deleteBtn.id = shift.id;
  
        UI.timeSlotsRowSelector(s, e).map((option) => {
          let optionElement = document.createElement("option");
          optionElement.innerHTML = option;
          optionElement.innerText == shift.from
            ? (optionElement.selected = "selected")
            : "";
          selectElementFrom.appendChild(optionElement);
        });
  
        UI.timeSlotsRowSelector(s, e).map((option) => {
          let optionElement = document.createElement("option");
          optionElement.innerHTML = option;
          optionElement.innerText == shift.to
            ? (optionElement.selected = "selected")
            : "";
          selectElementTo.appendChild(optionElement);
        });
  
        positions.map((position) => {
          let optionElement = document.createElement("option");
          optionElement.innerHTML = position;
          optionElement.innerText == shift.position
            ? (optionElement.selected = "selected")
            : "";
          selectElementPosition.appendChild(optionElement);
        });

        selectFromWrapper.appendChild(selectElementFrom);
        selectToWrapper.appendChild(selectElementTo);
        selectPositionWrapper.appendChild(selectElementPosition);

        cellDataFrom.appendChild(selectFromWrapper);
        cellDataTo.appendChild(selectToWrapper);
        cellDataPosition.appendChild(selectPositionWrapper);
        cellDataDelete.appendChild(deleteBtn);
  
        tableRowElement.appendChild(cellDataFrom);
        tableRowElement.appendChild(cellDataTo);
        tableRowElement.appendChild(cellDataPosition);
        tableRowElement.appendChild(cellDataDelete);
		  
		tableRowElement.querySelectorAll(".cell").forEach((e) => e.remove());
  
        UI.timeSlotsRowSelector(s, e).map((cell, index, arr) => {
          let timeCell = document.createElement("td");
          timeCell.classList.add("cell");
          //timeCell.innerText = cell;
          let from = arr.indexOf(shift.from);
          let to = arr.indexOf(shift.to);
			
          if(index >= from && index < to){
			  
		  	timeCell.classList.add("selected");
			 UI.colorPosition(shift.position,timeCell);
			  
			  index >= from
                  ? timeCell.setAttribute("colspan", to - from)
                  : timeCell;
			  
                arr.length = from + 1;
			 
                hours = (to - from) / 2;
                timeCell.innerText = `${hours} ${
                  hours < 2 ? "hour" : "hours"
                } - ${shift.position}`;
				
			  
		  } else {
			  
		  	timeCell.classList.add("unselected");
		  }
     		
          tableRowElement.appendChild(timeCell);
			
        });
  
        let element = document.getElementById(el).appendChild(tableRowElement);
  
		  
        //ADD EVENTS TO ALL SELECTS
        element.addEventListener("change", (el) => {
          let hours = "";
			
          //IF CLICKED ON A --------FROM----------- SELECT ELEMENT
          if (el.target.classList.contains("from")) {
            //ID TO UPDATE THE SHIFT IN THE SHIFT ARRAY OBJ
            tableRowElement.parentElement.id == "pre-row"
              ? UI.newRoster.setShiftsPreFrom(tableRowElement.id, el.target.value)
              : tableRowElement.parentElement.id == "open-row"
              ? UI.newRoster.setShiftsOpenFrom(
                  tableRowElement.id,
                  el.target.value
                )
              : tableRowElement.parentElement.id == "close-row"
              ? UI.newRoster.setShiftsCloseFrom(
                  tableRowElement.id,
                  el.target.value
                )
              : tableRowElement.parentElement;
            //console.log(UI.newRoster);
            
			  //UI
            tableRowElement.querySelectorAll(".cell").forEach((e) => e.remove());
			  
            UI.timeSlotsRowSelector(s, e).map((cell, index, arr) => {
              let timeCell = document.createElement("td");
              timeCell.classList.add("cell");
              //timeCell.innerText = cell;
              let from = arr.indexOf(el.target.value);
              let to = arr.indexOf(el.currentTarget.children[1].firstChild.firstChild.value);
              //console.log(el.currentTarget);
              //// UPDATE THE LABOUR PER HOUR 
              // console.log(element.parentElement.id);
              element.parentElement.id == 'open-row' ? UI.newRoster.updateLabourPerHour(arr) : null;
              element.parentElement.id == 'open-row' ? UI.displayLabourHours(
                UI.newRoster.getLabourPerHour(),
                'orange',
                'labour-hours-open-head'
              ) : null;

              if (index >= from && index < to) {
                timeCell.classList.add("selected");
                //GETTING THE POSITION VALUE FOR THE COLORPOSITION FUNC
                //console.log(el.currentTarget.children.item(2).firstChild.value);
                UI.colorPosition(
                  el.currentTarget.children.item(2).firstChild.firstChild.value,
                  timeCell
                );
				  
                index >= from
                  ? timeCell.setAttribute("colspan", to - from)
                  : timeCell;
                arr.length = from + 1;
				//console.log(arr);
                hours = (to - from) / 2;
                timeCell.innerText = `${hours} ${
                  hours < 2 ? "hour" : "hours"
                } - ${el.currentTarget.children.item(2).firstChild.firstChild.value}`;
				
                //UPDATE THE SHIFT OBJECT WITH HOURS PROPERTY
                tableRowElement.parentElement.id == "pre-row"
                  ? UI.newRoster.setHoursShiftsPre(tableRowElement.id, hours)
                  : tableRowElement.parentElement.id == "open-row"
                  ? UI.newRoster.setHoursShiftsOpen(tableRowElement.id, hours)
                  : tableRowElement.parentElement.id == "close-row"
                  ? UI.newRoster.setHoursShiftsClose(tableRowElement.id, hours)
                  : tableRowElement.parentElement;
                  //console.log(UI.newRoster);
              } else {
                timeCell.classList.add("unselected");
              }
              tableRowElement.appendChild(timeCell);
            });
			  

            //IF CLICKED ON A -------TO---------- SELECT ELEMENT
          } else if (el.target.classList.contains("to")) {
            //ID TO UPDATE THE SHIFT IN THE SHIFT ARRAY OBJ
            tableRowElement.parentElement.id == "pre-row"
              ? UI.newRoster.setShiftsPreTo(tableRowElement.id, el.target.value)
              : tableRowElement.parentElement.id == "open-row"
              ? UI.newRoster.setShiftsOpenTo(tableRowElement.id, el.target.value)
              : tableRowElement.parentElement.id == "close-row"
              ? UI.newRoster.setShiftsCloseTo(tableRowElement.id, el.target.value)
              : tableRowElement.parentElement;
            //console.log(UI.newRoster);
            //UI
            tableRowElement.querySelectorAll(".cell").forEach((e) => e.remove());
            UI.timeSlotsRowSelector(s, e).map((cell, index, arr) => {
              let timeCell = document.createElement("td");
              timeCell.classList.add("cell");
              //timeCell.innerText = cell;
              let from = arr.indexOf(
                el.currentTarget.firstChild.firstChild.firstChild.value
              );
              let to = arr.indexOf(el.target.value);

              //// UPDATE THE LABOUR PER HOUR
              //console.log(element.parentElement.id); TO UPDATE AND DISPLAY ONLY IF THIS IS CLICKED ON
              element.parentElement.id == 'open-row' ? UI.newRoster.updateLabourPerHour(arr) : null;
              element.parentElement.id == 'open-row' ? UI.displayLabourHours(
                UI.newRoster.getLabourPerHour(),
                'orange',
                'labour-hours-open-head'
              ) : null;

              if (index >= from && index < to) {
                timeCell.classList.add("selected");
                //GETTING THE POSITION VALUE FOR THE COLORPOSITION FUNC
                //console.log(el.currentTarget.children.item(2).firstChild.value);
                UI.colorPosition(
                  el.currentTarget.children.item(2).firstChild.firstChild.value,
                  timeCell
                );
                index >= from
                  ? timeCell.setAttribute("colspan", to - from)
                  : timeCell;
                arr.length = from + 1;
                hours = (to - from) / 2;
                timeCell.innerText = `${hours} ${
                  hours < 2 ? "hour" : "hours"
                } - ${el.currentTarget.children.item(2).firstChild.firstChild.value}`;
                //UPDATE THE SHIFT OBJECT WITH HOURS PROPERTY
                tableRowElement.parentElement.id == "pre-row"
                  ? UI.newRoster.setHoursShiftsPre(tableRowElement.id, hours)
                  : tableRowElement.parentElement.id == "open-row"
                  ? UI.newRoster.setHoursShiftsOpen(tableRowElement.id, hours)
                  : tableRowElement.parentElement.id == "close-row"
                  ? UI.newRoster.setHoursShiftsClose(tableRowElement.id, hours)
                  : tableRowElement.parentElement;
                //console.log(UI.newRoster);
              } else {
                timeCell.classList.add("unselected");
              }
              tableRowElement.appendChild(timeCell);
            });
            //IF CLICKED ON A --------POSITION------------ SELECT ELEMENT
          } else if (el.target.classList.contains("position")) {
            //ID TO UPDATE THE SHIFT IN THE SHIFT ARRAY OBJ
            tableRowElement.parentElement.id == "pre-row"
              ? UI.newRoster.setPositionShiftsPre(
                  tableRowElement.id,
                  el.target.value
                )
              : tableRowElement.parentElement.id == "open-row"
              ? UI.newRoster.setPositionShiftsOpen(
                  tableRowElement.id,
                  el.target.value
                )
              : tableRowElement.parentElement.id == "close-row"
              ? UI.newRoster.setPositionShiftsClose(
                  tableRowElement.id,
                  el.target.value
                )
              : tableRowElement.parentElement;
            //console.log(UI.newRoster);
            //CHANGE COLOR--------------------------------------------------------
            const selected = el.currentTarget.querySelectorAll(".selected");
            selected[0]
              ? (UI.colorPosition(el.target.value, selected[0]),
                (selected[0].innerText = `${
                  selected[0].getAttribute("colspan") / 2
                } ${
                  selected[0].getAttribute("colspan") / 2 < 2 ? "hour" : "hours"
                } - ${el.target.value}`))
              : null;
          }
        });
  
        //ADD EVENT TO ALL DELETE BTNs
        element.addEventListener("click", (el) => {
          if (el.target.classList.contains("delete-btn")) {
            
            //REMOVE FROM ROSTER OBJECT
            tableRowElement.parentElement.id == "pre-row"
              ? UI.newRoster.removeShiftsPre(el.target.id)
              : tableRowElement.parentElement.id == "open-row"
              ? UI.newRoster.removeShiftsOpen(el.target.id)
              : tableRowElement.parentElement.id == "close-row"
              ? UI.newRoster.removeShiftsClose(el.target.id)
              : tableRowElement.parentElement;

            //// UPDATE THE LABOUR PER HOUR
              //console.log(element.parentElement.id); TO UPDATE AND DISPLAY ONLY IF THIS IS CLICKED ON
              element.parentElement.id == 'open-row' ? UI.newRoster.updateLabourPerHour(UI.timeSlotsRowSelector(s, e)) : null;
              element.parentElement.id == 'open-row' ? UI.displayLabourHours(
                UI.newRoster.getLabourPerHour(),
                'orange',
                'labour-hours-open-head'
              ) : null;

            //REMOVE FROM UI
            el.currentTarget.id == el.target.id
              ? el.currentTarget.remove()
              : el.currentTarget;
          }
        });
      });
    }
  
  /////////////// END OF AD SHIFT TO ROSTER ////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
	
    //TOTAL HOURS
    static displayTotalHours(arr, el) {
      const totalElement = document.getElementById(el);
      totalElement.innerHTML = arr.length ? arr.length / 2 - 0.5 : arr.length;
    }
  
    //TABLE HEADERS
    static addTimesRuler(s = "10:00", e = 0, color = "red", el1, el2) {
      const tableHead = document.getElementById(el1);
      let hours = s.split(":");
      const result = [];
      let count = hours[1] == "30" ? 30 : 0;
      for (let i = 0; i < e; i++) {
        const time = new Date();
        time.setHours(hours[0]);
        time.setMinutes(count);
        time.setSeconds("00");
        result.push(time);
        count += 30;
      }
      let output = result.map((time) => {
        return `<td class="time-number ${color}">${
          (time.getHours() < 10 ? "0" : "") + time.getHours()
        }:${(time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}</td>`;
      });
      const rowHeadEmpty = `<th>FROM</th><th class="width">TO</th><th>POSITION</th><th></th>`;
      output.unshift(rowHeadEmpty);
      tableHead.innerHTML = output.join("");
      UI.displayTotalHours(result, el2);
    }

    //TABLE LABOUR HEADER
    static displayLabourHours (arr, color = "orange", el1){
      //console.log(arr);
      let reducedArr = [];
      for (let i = 0; i < arr.length; i = i + 2){
        arr[i] + arr[i+1] ? reducedArr.push(arr[i] + arr[i+1]) : reducedArr.push(0);
      }
      //console.log(reducedArr);
      const tableHead = document.getElementById(el1);
      let output = reducedArr.map((item, index, arr) => {
        //console.log(arr.length-1); gettin the last array item
        return `<td class="labour-number ${color}" colspan="${index == arr.length-1 && item < 1 ? '1' : '2'}">${item}</td>`;
      });
      const rowHeadEmpty = `<th></th><th class="width"></th><th>LABOUR PLAN</th><th></th>`;
      output.unshift(rowHeadEmpty);
      tableHead.innerHTML = output.join("");
    }
  
    //TIMES FOR SELECT IN DOM
    static addTimeSlots(el) {
      const timeSlots = document.getElementById(el);
      const result = [];
      let count = 0;
      for (let i = 0; i < 48; i++) {
        const time = new Date();
        time.setHours("00").toLocaleString("en-US");
        time.setMinutes(count);
        time.setSeconds("00");
        result.push(time);
        count += 30;
      }
      let output = result.map((time) => {
        return `<option>${(time.getHours() < 10 ? "0" : "") + time.getHours()}:${
          (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()
        }</option>`;
      });
      timeSlots.innerHTML = output.join("");
    }
  
    //TIMES FOR ROW SELECT DYNAMIC
    static timeSlotsRowSelector(s = "10:00", e = 0) {
      let hours = s.split(":");
      const result = [];
      let count = hours[1] == "30" ? 30 : 0;
      for (let i = 0; i < e; i++) {
        const time = new Date();
        time.setHours(hours[0]);
        time.setMinutes(count);
        time.setSeconds("00");
        result.push(time);
        count += 30;
      }
      let output = result.map((time) => {
        return `${(time.getHours() < 10 ? "0" : "") + time.getHours()}:${
          (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()
        }`;
      });
      return output;
    }
	
	//ROSTER NAMES FOR THE ROSTER SELECT
	static rosterNames (rosters, el, selected){
		const element = document.getElementById(el);
		let names = rosters.map((roster)=>{return `<option>${roster.name}</options>`});
		element.innerHTML = names.join("");
		element.value = selected;
		}
		
  }
  
  ///////////////////// END OF UI CLASS ////////////////////////////////
	

  //////////////////// E V E N T S /////////////////////////////////////	
	
  //////////////////////////////////////////////////////////////////////
  //EVENTS ON DOM LOAD
  document.addEventListener("DOMContentLoaded", () => {
    UI.displayRoster();
  });
  
  //EVENT SELECT ROSTER TO LOAD FROM LOCAL STORAGE
  const selectRoster = document.getElementById('roster-template-select');
	selectRoster.addEventListener('change', (e)=>{
		
		//CLEAR ALL TABLE ROWS FROM UI BEFORE LOADING NEW
		const openElements = document.querySelector('#open-row');
		openElements.querySelectorAll('tr').forEach(item=> item.remove());
		
		const preElements = document.querySelector('#pre-row');
		preElements.querySelectorAll('tr').forEach(item=> item.remove());
		
		const closeElements = document.querySelector('#close-row');
		closeElements.querySelectorAll('tr').forEach(item=> item.remove());
		
		//CLEAR DATA ARRAY
		UI.rosters = [];
		
		//RENDER NEW IN UI
		UI.displayRoster(e.target.value);
		
	});
  
  //EVENT SAVE ROSTER BUTTON
  const saveRoster = document.getElementById('save-roster');
  saveRoster.addEventListener('click', (e)=>{
  		let rosterName = prompt('Please enter roster name.', '');
	  	UI.newRoster.setRosterName(rosterName);
	    Store.addRoster(UI.newRoster);
	    UI.rosterNames(Store.getRosters(), 'roster-template-select');
	 // console.log(UI.newRoster);
	  
  });
  
  //EVENTS ADD PRE SHIFT
  const addRowPreBtn = document.getElementById("add-row-pre-btn");
  addRowPreBtn.addEventListener("click", (e) => {
    const timePreSelect = document.getElementById("time-pre-select");
    let shift = new Shift(
      UI.newRoster.shiftsPre.length,
      "",
      UI.StoredPositions[0],
      timePreSelect.value,
      timePreSelect.value,
      ""
    );
    UI.addShiftToRoster(
      [shift],
      "pre-row",
      timePreSelect.value,
      UI.countHeadPre,
      UI.StoredPositions
    );
    UI.newRoster.setShiftsPre(shift);
    //console.log(UI.newRoster);
  });
  
  //EVENTS ADD OPEN SHIFT
  const addRowOpenBtn = document.getElementById("add-row-open-btn");
  addRowOpenBtn.addEventListener("click", (e) => {
    const timeOpenSelect = document.getElementById("time-open-select");
    let shift = new Shift(
      UI.newRoster.shiftsOpen.length,
      "",
      UI.StoredPositions[0],
      timeOpenSelect.value,
      timeOpenSelect.value,
      ""
    );
    UI.addShiftToRoster(
      [shift],
      "open-row",
      timeOpenSelect.value,
      UI.countHeadOpen,
      UI.StoredPositions
    );
    UI.newRoster.setShiftsOpen(shift);
    //console.log(UI.newRoster);
  });
  
  //EVENTS ADD CLOSE SHIFT
  const addRowCloseBtn = document.getElementById("add-row-close-btn");
  addRowCloseBtn.addEventListener("click", (e) => {
    const timeCloseSelect = document.getElementById("time-close-select");
    let shift = new Shift(
      UI.newRoster.shiftsClose.length,
      "",
      UI.StoredPositions[0],
      timeCloseSelect.value,
      timeCloseSelect.value,
      ""
    );
    UI.addShiftToRoster(
      [shift],
      "close-row",
      timeCloseSelect.value,
      UI.countHeadClose,
      UI.StoredPositions
    );
    UI.newRoster.setShiftsClose(shift);
    //console.log(UI.newRoster);
  });
  
  //EVENTS TABLE HEAD SELECTS - PRE
  const timePreSelect = document.getElementById("time-pre-select");
  timePreSelect.addEventListener("change", (e) => {
    UI.addTimesRuler(
      e.target.value,
      UI.countHeadPre,
      "red",
      "time-pre-head",
      "total-pre"
    );
    UI.newRoster.setTimePreSelect(e.target.value);
    //console.log(UI.newRoster);
  });
  
  const incrementPreBtn = document.getElementById("increment-pre-btn");
  incrementPreBtn.addEventListener("click", (e) => {
    UI.countHeadPre++;
    UI.addTimesRuler(
      timePreSelect.value,
      UI.countHeadPre,
      "red",
      "time-pre-head",
      "total-pre"
    );
    UI.newRoster.setCountHeadPre(UI.countHeadPre);
    //console.log(UI.newRoster);
  });
  
  const decrementPreBtn = document.getElementById("decrement-pre-btn");
  decrementPreBtn.addEventListener("click", (e) => {
    UI.countHeadPre--;
    UI.addTimesRuler(
      timePreSelect.value,
      UI.countHeadPre,
      "red",
      "time-pre-head",
      "total-pre"
    );
    UI.newRoster.setCountHeadPre(UI.countHeadPre);
    //console.log(UI.newRoster);
  });
  
  //EVENTS TABLE HEAD SELECTS - OPEN
  const timeOpenSelect = document.getElementById("time-open-select");
  timeOpenSelect.addEventListener("change", (e) => {
    UI.addTimesRuler(
      e.target.value,
      UI.countHeadOpen,
      "green",
      "time-open-head",
      "total-open"
    );
    UI.newRoster.setTimeOpenSelect(e.target.value);
    //console.log(UI.newRoster);
  });
  
  const incrementOpenBtn = document.getElementById("increment-open-btn");
  incrementOpenBtn.addEventListener("click", (e) => {
    UI.countHeadOpen++;
    UI.addTimesRuler(
      timeOpenSelect.value,
      UI.countHeadOpen,
      "green",
      "time-open-head",
      "total-open"
    );
    UI.newRoster.setCountHeadOpen(UI.countHeadOpen);
    UI.newRoster.setLabourPerHour(UI.countHeadOpen);
    //console.log(UI.newRoster);
  });
  
  const decrementOpenBtn = document.getElementById("decrement-open-btn");
  decrementOpenBtn.addEventListener("click", (e) => {
    UI.countHeadOpen--;
    UI.addTimesRuler(
      timeOpenSelect.value,
      UI.countHeadOpen,
      "green",
      "time-open-head",
      "total-open"
    );
    UI.newRoster.setCountHeadOpen(UI.countHeadOpen);
    UI.newRoster.setLabourPerHour(UI.countHeadOpen);
    //console.log(UI.newRoster);
  });
  
  //EVENTS TABLE HEAD SELECTS - CLOSE
  const timeCloseSelect = document.getElementById("time-close-select");
  timeCloseSelect.addEventListener("change", (e) => {
    UI.addTimesRuler(
      e.target.value,
      UI.countHeadClose,
      "blue",
      "time-close-head",
      "total-close"
    );
    UI.newRoster.setTimeCloseSelect(e.target.value);
    //console.log(UI.newRoster);
  });
  
  const incrementCloseBtn = document.getElementById("increment-close-btn");
  incrementCloseBtn.addEventListener("click", (e) => {
    UI.countHeadClose++;
    UI.addTimesRuler(
      timeCloseSelect.value,
      UI.countHeadClose,
      "blue",
      "time-close-head",
      "total-close"
    );
    UI.newRoster.setCountHeadClose(UI.countHeadClose);
    //console.log(UI.newRoster);
  });
  
  const decrementCloseBtn = document.getElementById("decrement-close-btn");
  decrementCloseBtn.addEventListener("click", (e) => {
    UI.countHeadClose--;
    UI.addTimesRuler(
      timeCloseSelect.value,
      UI.countHeadClose,
      "blue",
      "time-close-head",
      "total-close"
    );
    UI.newRoster.setCountHeadClose(UI.countHeadClose);
    //console.log(UI.newRoster);
  });
  