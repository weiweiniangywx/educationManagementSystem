<template>
<div>
	<div class="curSettings">
      <div>
        <span>当前学年学期：{{year}}学年第{{semester}}学期</span>
        <span>当前周数：{{week}}</span>
        <span>请提前2天申请，若在当前时间是17：00后，则顺延一天</span>
      </div>
      <div>
        <span>任课教师：{{teacher}}</span>
        <span>提示：{{teacher}}你在【{{year}}学年第{{semester}}学期】共上【{{courseNum}}】门教学课，在调/补课时，你所选上课时段已过冲突筛选，请留意。</span>
      </div>
    </div>

	<div id="adjShow">
		<!-- 可调课程信息 -->
		<div class="adjShowDiv">
			<table class="applyTable">
				<thead>
					<tr>
						<th>请选择</th>
						<th>序号</th>
						<th>课程编号</th>
						<th>课程名称</th>
						<th>班级名称</th>
						<th>任课老师</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in courseList" :key="data">
						<td class="applyAdj">
							<a value="toggle" @click="applyAdjBtn(index)" >申请调课</a>
						</td>
						<td v-text="index + 1"></td>
						<td>{{data.courseId}}</td>
						<td :value="data.courseAssociationId">{{data.courseName}}</td>
						<td :value="data.classId">{{data.className}}</td>
						<td :value="data.teacherId">{{data.teacherName}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- 隐藏调课选项 -->
		<div class="adjSel" v-if="isShow">
			<span class="textBlue" style="float: left; margin: 0.4rem 0.7rem;">提示：请从左往右依次选择。</span>
		    <table>
				<tbody>
					<tr>	<!-- 第一行 -->
						<td class="designation" width="8%">
							<span>原周数：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selPreWeek">
								<option disabled>选择周数</option>
								<option v-for="preWeek in weekset" :value="preWeek">第{{ preWeek }}周</option>
							</select>
						</td>
						<td class="designation" width="8%">
							<span>原上课时间：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selCourseDay">
								<option disabled>选择时间</option>
								<option v-for="(preDay, index) in weekdayandlessonnum" :value="preDay">星期{{ preDay[0] }}第{{preDay[1] }}节</option>
							</select>
						</td>
						<!-- <td class="designation" width="8%">
							<span>原节次：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selPreSection">
								<option disabled>选择节次</option>
								<option v-for="preSection in lessonNumset" :value="preSection">第{{ preSection }}节</option>
							</select>
						</td> -->
						<td class="designation" width="8%">
							<span>上课教室：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selClassroom">
								<option disabled>选择上课教室</option>
								<option v-for="classroom in selectiveClassroomSet" :value="classroom">{{ classroom }}</option>
							</select>
						</td>
					</tr>
					<tr>	<!-- 第二行 -->
						<td class="designation">
							<span>调至周数：</span>
						</td>
						<td class="choice">
							<select v-model="selAdjWeek" @change="selectiveWeekSetChange()">
								<option disabled>选择周数</option>
								<option v-for="adjWeek in selectiveWeekSet" :value="adjWeek">第{{ adjWeek }}周</option>
							</select>
						</td>
						<td class="designation">
							<span>调至上课时间：</span>
						</td>
						<td class="choice">
							<select v-model="selAdjDay">
								<option disabled>选择时间</option>
								<option v-for="(adjDay, index) in allWeekdaysAndLessonNumsList" :value="adjDay">星期{{adjDay[0]}}第{{adjDay[1]}}节</option>
							</select>
						</td>
						<!-- <td class="designation">
							<span>调至节次：</span>
						</td>
						<td class="choice">
							<select v-model="selAdjSection" @click="selectiveLessonNumClick()">
								<option disabled>选择节次</option>
								<option v-for="adjSection in selectiveLessonNum" :value="adjSection" @onchange="selectiveLessonNumChange()">第{{ adjSection }}节</option>
							</select>
						</td> -->
						<td class="designation">
							<span>申请理由：</span>	<!-- 50字 -->
						</td>
						<td class="choice" width="14%">
							<div style="width:10rem;">
								<Input v-model="message" type="textarea" :rows="2"></Input>
							</div>
						</td>
					</tr>
				</tbody>
		    </table>
		    <div class="submit">
		    	<button class="am-btn am-btn-success am-radius" @click="modal1 = true">提交</button>
		    	<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
					<p style="text-align:center; font-size:1.1rem;">您确定要提交吗？</p>
					<div slot="footer" style="text-align:center;">
						<Button id="modalBtn" @click="ok1()">确定</Button>
						<Button id="modalBtn" @click="cancel1()">取消</Button>
					</div>
				</Modal>
		    	<button class="am-btn am-btn-success am-radius" @click="modal2 = true">取消</button>
		    	<Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
					<p style="text-align:center; font-size:1.1rem;">您确定不保存并取消吗？</p>
					<div slot="footer" style="text-align:center;">
						<Button id="modalBtn" @click="ok2()">确定</Button>
						<Button id="modalBtn" @click="cancel2()">取消</Button>
					</div>
				</Modal>
		    </div>
		</div>

		<!-- 已调课程信息 -->
		<div class="haveAppliedInfo">
			<table class="applyTable">
				<thead>
					<tr>
						<th>序号</th>
						<th>课程编号</th>
						<th>课程名称</th>
						<th>任课教师</th>
						<th>班级名称</th>
						<th>调整上课时间</th>
						<th>教室</th>
						<th>申请理由</th>
						<th>申请情况</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in applicationList">
						<td v-text="index + 1"></td>
						<td v-text="data.courseId"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.teacherName"></td>
						<td v-text="data.className"></td>
						<td v-text="data.lessonChangeInfo"></td>
						<td v-text="data.useClassroom"></td>
						<td v-text="data.mediationReason"></td>
						<td v-text="data.auditType"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">请选择原周数！（调至周数必须大于原周数）</p>
		    <p v-else-if= "remindResult === '2'">提交失败！</p>
		    <p v-else-if= "remindResult === '3'">保存失败！</p>
		    <p v-else-if= "remindResult === '4'">请选择所有选项再提交！</p>
		    <p v-else-if= "remindResult === '5'">请选择前面4个选项！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>
 
<script>
export default {
	data () {
		return {
			year: '',
			semester: '',
			week: '',
			teacher: '',
			courseNum: '',

			isShow: false,
			//	申请调课列表原始数据
			courseList: [
				{className: '对口高职2015护理（9+3）1班', courseName: '护理管理学',courseId: '10301', teacherName: '何平（61742）'}
			],
			// 表格所选当行变量
			teacherNameGet: '',
    		courseIdGet: '',
    		courseNameGet: '',
    		classNameGet: '',
			courseAssociationIdGet: '',
			classIdGet: '',
			teacherIdGet: '',
			//	申请后所填信息展示
			applicationList: [
				// {num: '01', courseNum: '8854934', courseName: '护理学', courseTeacher: '何平', className: '对口高职2015护理（9+3）1班', appliedTime: '第一周星期一第一节调整到第二周星期二第二节', appliedClassroom: '第一教学楼202', appliedReason: '五一放假', applyState: '正在申请中'}
			],
			// 输入框
			message: '',
			// adjSel下拉选项******************************************************
	        selPreWeek: '选择周数',	// 原周数
	        weekset: [
	          // { text: '选择周数', value: '0' },
	          // { text: '第一周', value: '1' }
	        ],
	        selCourseDay: '选择时间',		// 原星期和节次
	        weekdayandlessonnum: [
	        	// [1,2]
	        ],
	        // selPreSection: '选择节次',		// 原节次
	        // lessonNumset: [],
	        selClassroom: '选择上课教室',		// 上课教室
	        selectiveClassroomSet: [],
	        selAdjWeek: '选择周数',	// 调至周数
	        selectiveWeekSet: [],
	        selAdjDay: '选择时间',		// 调至星期和节次
	        allWeekdaysAndLessonNumsList: [
	        	// [1,2]
	        ],
	        // selAdjSection: '选择节次',		// 调至节次
	        // selectiveLessonNum: [],
	        preWeek: [],
	        preSection: [],
	        adjWeek: [],
	        adjSection: [],
	        modal1: false,		// 提交弹出框
	        modal2: false,		// 取消弹出框
	        modalResult: false,
			remindResult: ''
		}
	},
  	beforeMount: function() {
        this.$http.post('./alternateLessionApplication',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.year = data.year;
            this.semester = data.semester;
            this.week = data.week;
            this.teacher = data.teacher;
            this.courseNum = data.courseNum;
            this.courseList = data.courseList;
            this.applicationList = data.applicationList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// weekChange: function(){
		// 	alert(this.selPreWeek);
		// },
		// 点击表格“申请调课”，显示选项内容****************************************************************************
	    applyAdjBtn: function (index) {
	    	this.teacherNameGet = this.courseList[index].teacherName;
    		this.courseIdGet = this.courseList[index].courseId;
    		this.courseNameGet = this.courseList[index].courseName;
    		this.classNameGet = this.courseList[index].className;
	    	this.courseAssociationIdGet = this.courseList[index].courseAssociationId;
	    	this.teacherIdGet = this.courseList[index].teacherId;
	    	this.classIdGet = this.courseList[index].classId;
    		if (this.isShow == false) {
    			this.isShow = true;
    			this.$http.post('./alternateLessionApplication/application-button',{
    				"teacherName": this.courseList[index].teacherName,
    				"courseId": this.courseList[index].courseId,
    				"courseName": this.courseList[index].courseName,
    				"className": this.courseList[index].className,
    				"courseAssociationId": this.courseList[index].courseAssociationId,
    				"teacherId": this.courseList[index].teacherId,
    				"classId": this.courseList[index].classId
		        },{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	this.weekset = data.weekset;
			            this.weekdayandlessonnum = data.weekdayandlessonnum;
			            this.selectiveClassroomSet = data.selectiveClassroomSet;
			            this.selectiveWeekSet = data.selectiveWeekSet;
			            // 从二维数组中获取原星期和原节次的数组数据
			            // for (var i = 0; i < this.weekdayandlessonnum.length; i++) {
			            // 	this.preWeek.push(this.weekdayandlessonnum[i][0]);
			            // 	this.preSection.push(this.weekdayandlessonnum[i][1]);
			            // }
		            }else if (data.result == "0") {
				        this.$Message.error('操作失败！请重试');
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
		        });
    		}
    		else {
    			this.isShow = true;
    		}
    	},
    	// 选择调制周数，判断所选周数是否比原周数大**********************************************************************
    	// 选择成功之后，申请获得调至星期下拉数据**********
    	selectiveWeekSetChange: function () {
    		var preWeek = this.selPreWeek;
    		if (this.selAdjWeek < preWeek) {
    			// this.$Message.error('请在原周之后选择周数！');
    			this.modalResult = true;
    			this.remindResult = '1';
    			this.selAdjWeek = '选择周数';
    		}else {
    			if (this.selPreWeek=="选择周数" || this.selCourseDay=="选择时间" || this.selClassroom=="选择上课教室" || this.selAdjWeek=="选择周数" ) {
	    			this.modalResult = true;
	    			this.remindResult = '5';
	    		}else {
					this.$http.post('./alternateLessionApplication/application-select',{
			        	"originWeek": this.selPreWeek,
			        	"originWeekday": this.selCourseDay[0],
			        	"originLessonNum": this.selCourseDay[1],
			        	// "originLessonNum": this.selPreSection,
			        	"selectedClassroom": this.selClassroom,
			        	"selectedWeek": this.selAdjWeek,
			        	"teacherName": this.teacherNameGet,
						"courseId": this.courseIdGet,
						"courseName": this.courseNameGet,
						"className": this.classNameGet,
						"courseAssociationId": this.courseAssociationIdGet,
						"teacherId": this.teacherIdGet,
						"classId": this.classIdGet
			        },{    
			            "Content-Type":"application/json"
			        }).then(function(response){
			            console.log("获取申请:");
			            console.log(response.body);
			            var data = response.body;
			            this.allWeekdaysAndLessonNumsList = data.allWeekdaysAndLessonNumsList;
					    // 从二维数组中获取调至星期和调至节次的数组数据
					    for (var i = 0; i < this.allWeekdaysAndLessonNumsList.length; i++) {
					    	this.adjWeek.push(this.allWeekdaysAndLessonNumsList[i][0]);
					    	this.adjSection.push(this.allWeekdaysAndLessonNumsList[i][1]);
					    }


			         //    if (this.selAdjDay == "选择星期" && this.selAdjSection == "选择节次") {
			         //    	var a=[];
			         //    	var b=[];
			         //    	for (var i = 0; i < data.allWeekdaysAndLessonNumsList.length; i++) {
			         //    		if(a.length==0){
			         //    			a.push(data.allWeekdaysAndLessonNumsList[0][0]);
			         //    		}
			         //    		for(var j=0;j<a.length;j++){

			         //    			if(a[j]!=data.allWeekdaysAndLessonNumsList[i][0]){
			         //    				a.push(data.allWeekdaysAndLessonNumsList[i][0]);
			         //    			}

			         //    		}
			         //    		if(b.length==0){
			         //    			b.push(data.allWeekdaysAndLessonNumsList[0][1]);
			         //    		}
			         //    		for(var j=0;j<b.length;j++){
			         //    			if(b[j]!=data.allWeekdaysAndLessonNumsList[i][1]){
			         //    				b.push(data.allWeekdaysAndLessonNumsList[i][1]);
			         //    			}
			         //    		}
			         //    	}
			         //    	this.selectiveWeekday = a;
			         //    	this.selectiveLessonNum = b;
			        	// }
			        },function(error){
			            console.log("获取申请error:");
			            console.log(error);
		        	});
		        }
    		}
    	},
    	// 点击“提交”按钮，选项内容提交并隐藏*****************************************************************************
    	ok1 () {
            this.modal1 = false;
            // 判断选项是否为空
    		if (this.selPreWeek=="选择周数" || this.selCourseDay=="选择时间" || this.selClassroom=="选择上课教室" || this.selAdjWeek=="选择周数" || this.selAdjDay=="选择时间" ) {
    			this.modalResult = true;
    			this.remindResult = '4';
    		}else {

    			if (this.isShow ==true) {
	    			this.isShow = false;
	    			this.$http.post('./alternateLessionApplication/application-submit',{
						"originWeek": this.selPreWeek,
			        	"originWeekday": this.selCourseDay[0],
			        	"originLessonNum": this.selCourseDay[1],
			        	// "originLessonNum": this.selPreSection,
			        	"selectedClassroom": this.selClassroom,
			        	"selectedWeek": this.selAdjWeek,
			        	"selectedWeekday": this.selAdjDay[0],
			        	"selectedLessonNum": this.selAdjDay[1],
			        	// "selectedLessonNum": this.selAdjSection,
			        	"mediationReason": this.message,
			        	"teacherName": this.teacherNameGet,
						"courseId": this.courseIdGet,
						"courseName": this.courseNameGet,
						"className": this.classNameGet,
						"courseAssociationId": this.courseAssociationIdGet,
						"teacherId": this.teacherIdGet,
						"classId": this.classIdGet
			        },{
			            "Content-Type":"application/json"
			        }).then(function(response){
			            console.log("获取申请:");
			            console.log(response.body);
			            var data = response.body;
			            if (data.result == "1") {
			            	this.applicationList = data.applicationList;
	            			this.$Message.success('提交成功！请在下方表格中查看调课信息。');
	            			window.location.reload();	// 页面重新加载
			            }else if (data.result == "0") {
					        // this.$Message.error('操作失败！请重试');
					        this.modalResult = true;
					        this.remindResult = '2';
					    }
			        },function(error){
			            console.log("获取申请error:");
			            console.log(error);
		        	});
	    		}
	    		else {
	    			this.isShow = false;
	    		}
    		}
        },
        cancel1 () {
            this.modal1 = false;
                // this.$Message.error('提交失败！请重新操作。');
        },
    	// 取消并不保存***********************************************************************************************
    	// cancelBtn: function () {
    	// 	this.isShow = false;
    	// }
    	ok2 () {
            this.modal2 = false;
            // this.$Message.error('取消修改并未保存！');
            this.modalResult = true;
            this.remindResult = '3';
            this.isShow = false;
        },
        cancel2 () {
            this.modal2 = false;
        },
    	resultOk: function () {
    		this.modalResult = false;
    	}
  	}
}
</script>

<style scoped>
.curSettings {
  text-align: left;
  margin: 0.5rem 1rem;
}
.curSettings div {
  margin: 0.2rem 0;
}
.curSettings span {
  margin-right: 4rem;
  font-size: 0.9rem;
}

#adjShow {
    text-align: center;
    margin: 1rem 0;
}
.adjShowDiv {
	background-color: white;
}

.applyAdj a {
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
}
.applyAdj a:link,
.applyAdj a:hover {
	color: black;
}
.applyAdj a:active {
	color: blue;
}

/*隐藏选项内容*/
.adjSel {
    text-align: center;
    margin: 0.5rem;
}
.adjSel table {
	width: 100%;
}
.designation {
	text-align: right;
}
.choice {
	text-align: left;
}
/*.choice select {
	border-radius: 1rem;
	width: 10rem;
	height: 1.8rem;
	font-size: 0.8rem;
	outline: none;
}
select {
	cursor: pointer;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	background: url(../../public/images/angle-down.png) no-repeat 95% 90%;
}*/
.adjSel tr {
	height: 2.7rem;
}
.adjSel td {
	position: relative;
}
.submit {
	text-align: center;
	margin-bottom: 0.7rem;
}
.submit button {
	width: 5.6rem;
	margin: 0 0.7rem;
}
</style>
