<template>
  <div id="app">
    <div id="user-container">
      <div id="username" class="loginitem">
        <i class="fas fa-solid fa-user" aria-hidden="true"></i>
        <span @click="logout">Logout</span>
      </div>
      <a href="/main">TodoList</a>
    </div>
    <div>
      <TodoHeader>
        <h1>{{ title }}</h1>
      </TodoHeader>
      <Modal v-if="modalOpen === true" v-model="newSchedule" :InputArea="inputArea" @closeModal="closeModal" @openInput="openInput" 
      @addSchedule="addNewEvent"
      >
        <template v-slot:date>
          {{ selectedStart }}
        </template>
        <template v-slot:schedules>
          <!--selectinfo의 이벤트들을 for문으로 집어넣기?-->
          <div v-if="calendarOptions.events.findIndex(schedule => (this.selectedStart >= schedule.start) && (this.selectedEnd <= schedule.end)) == -1" class="noschedule">
            아직 일정이 없습니다.
          </div>
          <ul>
            <li class="schedule" v-for="schedule in calendarOptions.events.filter((schedule) => (this.selectedStart >= schedule.start) && (this.selectedEnd <= schedule.end))" v-bind:key="schedule">
              <span>{{ schedule.title }}</span>
              <i class="fas fa-solid fa-trash"></i>
            </li>
          </ul>

        </template>
      </Modal>
      <div class="calendar-container">
        <div class="calendar-main">
          <FullCalendar ref="fullCalendar" class="calendar-calendar" :options="calendarOptions">
            <template v-slot:eventContent="arg">
              <b>{{ arg.timeText }}</b>
              <i>{{ arg.event.title }}</i>
            </template>
          </FullCalendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoHeader from "../../components/TodoHeader.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGirdPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Modal from '../../components/Modal.vue'

export default {
  components: {
    FullCalendar,
    TodoHeader,
    Modal
  },
  created() {
    axios
      .get("/api/calendar/getInitialEvents")
      .then(res => {
        const data = res.data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.calendarOptions.events.push(data[i]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  data: function() {
    return {
      modalOpen: false,
      inputArea: false,
      calendarOptions: {
        plugins: [dayGirdPlugin, interactionPlugin],
        customButtons: {
          myPrevBtn: {
            text: "<",
            click: undefined
          },
          myNextBtn: {
            text: ">",
          },
          myPrevYear: { text: "<<"},
          myNextYear: { text: ">>"},
          myToday: { text: "today" }
        },
        headerToolbar: {
          left: "myPrevYear myPrevBtn",
          center: "myToday",
          right: "myNextBtn myNextYear"
        },
        initialView: "dayGridMonth",
        events: [],
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.selectDate,
        eventClick: this.clickEvent
        //eventsSet: this.handleEvents,
      },
      title: "",
      newSchedule: "",
      selectedStart: "",
      selectedEnd: "",
    };
  },
  mounted() {
    this.gettitleDate();
    this.calendarOptions.customButtons.myPrevBtn.click = () => {
      this.$refs.fullCalendar.getApi().prev();
      this.gettitleDate();
    };
    this.calendarOptions.customButtons.myNextBtn.click = () => {
      this.$refs.fullCalendar.getApi().next();
      this.gettitleDate();
    };
    this.calendarOptions.customButtons.myPrevYear.click = () => {
      this.$refs.fullCalendar.getApi().prevYear();
      this.gettitleDate();
    };
    this.calendarOptions.customButtons.myNextYear.click = () => {
      this.$refs.fullCalendar.getApi().nextYear();
      this.gettitleDate();
    };
    this.calendarOptions.customButtons.myToday.click = () => {
      this.$refs.fullCalendar.getApi().today();
      this.gettitleDate();
    };
  },
  computed: {},
  methods: {
    closeModal() {
      this.modalOpen = false;
    },
    openInput() {
      if (this.inputArea === true) {
        this.inputArea = false;
      } else {
        this.inputArea = true;
      }

      console.log(this.inputArea)
    },
    gettitleDate() {
      const calendar = this.$refs.fullCalendar.getApi();
      const calendarDate = calendar.view.title;
      console.log(calendarDate);

      this.title = calendarDate;
    },
    // 날짜 선택해서 모달창 열기
    selectDate(selectInfo) {
      console.log(this.calendarOptions.events.findIndex(schedule => (this.selectedStart >= schedule.start) && (this.selectedEnd <= schedule.end)));
      this.selectedStart = selectInfo.startStr;
      this.selectedEnd = selectInfo.endStr
      this.inputArea = false;
      this.modalOpen = true;
      //let title = this.schedule
      // title에 해당하는 정보는 modal로부터 전달받아야함...
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
    },
    addNewEvent() {
      console.log('입력은되는군', this.newSchedule);
      let title = this.newSchedule;

      if (title) {
        // newEvent의 아래 정보를 axios로 보내버리기
        const newEvent = {
          title,
          start: this.selectedStart,
          end: this.selectedEnd
        };
        axios({
          method: "post",
          url: "/api/calendar/addNewEvent",
          data: {
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end
          }
        })
          .then(res => {
            const addedEvent = {
              id: res.data.id,
              title: res.data.title,
              start: res.data.start,
              end: res.data.end
            };
            //calendarApi.addEvent(addedEvent);
            this.calendarOptions.events.push(addedEvent);
            console.log('현재이벤트는', this.calendarOptions.events);
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.initializeInfo();
    },
    initializeInfo() {
      this.newSchedule = ""
      //this.selectedStart = "",
      //this.selectedEnd = ""
    },
    // 이벤트 클릭해서 삭제 또는 수정
    clickEvent(clickInfo) {
      console.log('삭제할놈 정보', clickInfo.event)
      console.log(this.calendarOptions.events)
      if (confirm(`Do you really want to delete '${clickInfo.event.title}'`)) {
        axios({
          method: "post",
          url: "/api/calendar/deleteEvent",
          data: { id: clickInfo.event.id }
        })
          .then(() => {
            let events = this.calendarOptions.events
            for (let i = 0; i < events.length; i++) {
              console.log(events[i])
              console.log(clickInfo.event.id)
              if (events[i].id == clickInfo.event.id) {
                console.log('이경우')
                events.splice(i, 1);
                break
              }
            }
            //clickInfo.event.remove();
            console.log(events)

          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // currentEvents에 이벤트 저장 --> 백엔드에 보내는걸로 바꿔버리기, 추가되는 이벤트만?아냐 근데 프론트에서 보여주는것도 필요해....

    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          console.log("로그아웃 성공");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "/src/assets/global.css";

h1 {
  color: #2f3b52;
  font-weight: 500;
  margin: 3.5rem 0 1.5rem;
}
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b {
  margin-right: 3px;
}
.calendar-container {
  display: flex;
  min-height: 100%;
  font-family: Airal, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.calendar-main {
  flex-grow: 1;
  padding: 3em;
}
.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
#user-container {
  margin-top: 1rem;
  margin-left: 80%;
  padding: 0.5rem;
  max-width: 140px;
}
#username {
  display: flex;
  justify-content: space-around;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.6rem;
}
#username i {
  padding-top: 0.2rem;
}
.loginitem {
    background-color: white;
    height: 2rem;
    border-radius: 1rem;
}
.noschedule{
    color: #464343;
    text-align: center;
}
.schedule {
  position: relative;
  box-sizing: border-box;
  margin: 0.5rem 1rem 0.5rem 0;
  padding: 0.2rem 0.2rem 0.2rem 0.5rem;
  font-size: 1em;
  border-bottom: 1px solid #4d4b4b ;
  color: #313030;
  display: flex;
  justify-content: space-between;
  

  i:hover {
    cursor: pointer;
  }

}
</style>