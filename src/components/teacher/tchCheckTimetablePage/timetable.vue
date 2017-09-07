<template>
<div>
	<div class="tableSelect">
		<select v-model="selSemester">
			<option disabled>选择学期</option>
			<option v-for="semesterOpt in yearSemester" :value="semesterOpt">
				{{semesterOpt}}
				<!-- {{ semesterOpt.year }}第{{ semesterOpt.term }}学期 -->
			</option>
		</select>
		<select v-model="selWeek">
			<option disabled>选择周数</option>
			<option v-for="weekOpt in week" :value="weekOpt">
				第{{ weekOpt }}周
			</option>
		</select>
		<button class="am-btn am-btn-success am-radius" @click="checkTableBtn()">查看课表</button>
	</div>

	<div id="timetable">
		<div class="timetableBody">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="10%">节次/周次</th>
						<th width="14.8%">星期一</th>
						<th width="14.8%">星期二</th>
						<th width="14.8%">星期三</th>
						<th width="14.8%">星期四</th>
						<th width="14.8%">星期五</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>第一节<br>8:30-9:15</td>
						<td v-text="firstCourse" rowspan="2"></td>
						<td v-text="fourthCourse" rowspan="2"></td>
						<td v-text="seventhCourse" rowspan="2"></td>
						<td v-text="tenthCourse" rowspan="2"></td>
						<td v-text="thirteenthCourse" rowspan="2"></td>
					</tr>
					<tr>
						<td>第二节<br>9:20-10:05</td>
					</tr>
					<tr>
						<td>第三节<br>10:20-11:05</td>
						<td v-text="secondCourse" rowspan="2"></td>
						<td v-text="fifthCourse" rowspan="2"></td>
						<td v-text="eightCourse" rowspan="2"></td>
						<td v-text="eleventhCourse" rowspan="2"></td>
						<td v-text="fourteenthCourse" rowspan="2"></td>
					</tr>
					<tr>
						<td>第四节<br>11:10-11:55</td>
					</tr>
					<tr>
						<td>第五节<br>14:30-15:15</td>
						<td v-text="thirdCourse" rowspan="2"></td>
						<td v-text="sixthCourse" rowspan="2"></td>
						<td v-text="ninthCourse" rowspan="2"></td>
						<td v-text="twelfthCourse" rowspan="2"></td>
						<td v-text="classmeeting" rowspan="2">班会</td>
					</tr>
					<tr>
						<td>第六节<br>15:20-16:05</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="timetableList">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="">课程编码</th>
						<th width="">课程名称</th>
						<th width="">课程序号</th>
						<th width="">教师</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in teacherDetailCurriculum">
						<td v-text="data.courseSerial"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.courseSerialNumber"></td>
						<td v-text="data.courseTeacher"></td>
					</tr>
				</tbody>
			</table>
		</div>

		<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
			<div style="text-align:center; font-size:1.1rem;">
			    <p>操作失败！请重试</p>
			</div>
		    <div slot="footer" style="text-align:center;">
		        <Button id="modalBtn" @click="resultOk()">确认</Button>
		    </div>
		</Modal>
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			// year: '',
			// term: '',
			selSemester: '选择学期',
			yearSemester: [
				// 12456
			],
			selWeek: '选择周数',
			week: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
			firstCourse: '',
			secondCourse: '',
			thirdCourse: '',
			fourthCourse: '',
			fifthCourse: '',
			sixthCourse: '',
			seventhCourse: '',
			eightCourse: '',
			ninthCourse: '',
			tenthCourse: '',
			eleventhCourse: '',
			twelfthCourse: '',
			thirteenthCourse: '',
			fourteenthCourse: '',
			classmeeting: '班会',
			teacherDetailCurriculum: [
				// {courseSerial: 'A1600620', courseName: '护理学', courseSerialNumber: 'A1600620.01', courseTeacher: '何平'}
			],
			modalResult: false
		}
	},
	beforeMount: function () {
		this.$http.post('./teacherSeeCurriculum',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.yearSemester = data.yearSemester;
            // this.week = data.week;
            this.firstCourse = data.teacherCurriculum[0].firstCourse;
            this.secondCourse = data.teacherCurriculum[0].secondCourse;
            this.thirdCourse = data.teacherCurriculum[0].thirdCourse;
            this.fourthCourse = data.teacherCurriculum[0].fourthCourse;
            this.fifthCourse = data.teacherCurriculum[0].fifthCourse;
            this.sixthCourse = data.teacherCurriculum[0].sixthCourse;
            this.seventhCourse = data.teacherCurriculum[0].seventhCourse;
            this.eightCourse = data.teacherCurriculum[0].eighthCourse;
            this.ninthCourse = data.teacherCurriculum[0].ninthCourse;
            this.tenthCourse = data.teacherCurriculum[0].tenthCourse;
            this.eleventhCourse = data.teacherCurriculum[0].eleventhCourse;
            this.twelfthCourse = data.teacherCurriculum[0].twelfthCourse;
            this.thirteenthCourse = data.teacherCurriculum[0].thirteenthCourse;
            this.fourteenthCourse = data.teacherCurriculum[0].fourteenthCourse;
            this.teacherDetailCurriculum = data.teacherDetailCurriculum;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
	},
	methods: {
		checkTableBtn: function () {	// 查询课表
			this.$http.post('./teacherSeeCurriculum',{
	        	"yearSemester": this.selSemester,
	        	"week": this.selWeek
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
		            this.firstCourse = data.teacherCurriculum[0].firstCourse;
		            this.secondCourse = data.teacherCurriculum[0].secondCourse;
		            this.thirdCourse = data.teacherCurriculum[0].thirdCourse;
		            this.fourthCourse = data.teacherCurriculum[0].fourthCourse;
		            this.fifthCourse = data.teacherCurriculum[0].fifthCourse;
		            this.sixthCourse = data.teacherCurriculum[0].sixthCourse;
		            this.seventhCourse = data.teacherCurriculum[0].seventhCourse;
		            this.eightCourse = data.teacherCurriculum[0].eighthCourse;
		            this.ninthCourse = data.teacherCurriculum[0].ninthCourse;
		            this.tenthCourse = data.teacherCurriculum[0].tenthCourse;
		            this.eleventhCourse = data.teacherCurriculum[0].eleventhCourse;
		            this.twelfthCourse = data.teacherCurriculum[0].twelfthCourse;
		            this.thirteenthCourse = data.teacherCurriculum[0].thirteenthCourse;
		            this.fourteenthCourse = data.teacherCurriculum[0].fourteenthCourse;
		            this.teacherDetailCurriculum = data.teacherDetailCurriculum;
	            }else {
			        // this.$Message.error("操作失败！请重试");
			        this.modalResult = true;
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
			// var tableInfo = document.getElementById('tableInfo');
			// tableInfo.action = 'index.php';
			// tableInfo.method = 'get';
		},
    	resultOk: function () {
    		this.modalResult = false;
    	}
	}
}
</script>

<style scoped>
#timetable {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.timetableBody,
.timetableList {
	padding: 1rem 5rem;
}
.timetableList {
	padding-bottom: 3.3rem;
}

</style>