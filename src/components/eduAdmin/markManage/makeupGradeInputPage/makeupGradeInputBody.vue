<template>
<div>
	<div class="tableSelect">
		<select v-model="selGradeType">
			<option disabled>选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
		</select>
		<select v-model="selYearTerm">
			<option disabled>选择学期</option>
			<option v-for="yearTermOne in yearTerm" :value="yearTermOne.startYearSemester">{{yearTermOne.startYearSemester}}</option>
		</select>
		<select v-model="selCourseName">
			<option disabled>选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
		<button class="am-btn am-btn-success am-radius" v-on:click="findBtn()">查询</button>
		<button class="am-btn am-btn-success am-radius rightBtn" v-show="submitShow" @click="submitBtn()">提交</button>
		<button class="am-btn am-btn-success am-radius rightBtn" v-show="buttonShow" @click="saveAllBtn()">保存</button>
		<button class="am-btn am-btn-success am-radius rightBtn" v-show="buttonShow" @click="compileBtn()">编辑</button>
	</div>

	<div id="makeupGradeInputBody">
		<!-- 补考成绩输入 -->
		<div class="makeupScoreTable">
			<table class="normalTable" id="inputGroup">
				<thead>
					<tr>
						<th width="34%">学号</th>
						<th width="33%">姓名</th>
						<th width="33%">补考成绩</th>
					</tr>
				</thead>
				<tbody>
					<tr  v-for="(makeupScore, index) in makeUpGradeInputList" :key="makeupScore">
						<td v-text="makeupScore.studentId"></td>
						<td v-text="makeupScore.studentName"></td>
						<td>
							<input id="input1" type="text" :value="makeupScore.makeupGrade" readonly="true"/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<Modal v-model="modalOperation" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
			<p v-if="opertaionBool === '1'">您确定要保存所修改内容吗？</p>
			<p v-else-if="opertaionBool === '2'">您确定要提交成绩单吗？</p>
			<p v-else-if="opertaionBool === '2'" style="color:red;">（提交后成绩将不可修改）</p>
		</div>
		<div slot="footer" style="text-align:center;">
			<Button v-if="opertaionBool === '1'" id="modalBtn" @click="saveOk()">确定</Button>	<!-- 保存确定 -->
			<Button v-else-if="opertaionBool === '2'" id="modalBtn" @click="submitOk()">确定</Button>	<!-- 提交确定 -->
			<Button id="modalBtn" @click="cancel()">取消</Button>
		</div>
	</Modal>

	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">操作失败！请重试</p>
		    <p v-else-if= "remindResult === '2'">保存成功！</p>
		    <p v-else-if= "remindResult === '3'">提交成功！成绩将不可再修改。</p>
		    <p v-else-if= "remindResult === '4'">保存失败！</p>
		    <p v-else-if= "remindResult === '5'">提交失败！</p>
		    <p v-else-if= "remindResult === '6'">该课程没有可编辑的成绩！</p>
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
			buttonShow: false,
			submitShow: false,
			selGradeType: '选择年制',
			selYearTerm: '选择学期',
			selCourseName: '选择课程',
			gradeType: [		// 选择年制
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			yearTerm: [],		// 选择学期
			courseInfo: [],		// 选择课程
			makeUpGradeInputList: [
				// {studentId: '010203', studentName: '何平', makeupGrade: '75'},
				// {studentId: '010203', studentName: '何平', makeupGrade: '75'}
			],
			modalOperation: false,
			modalResult: false,
			opertaionBool: '',
			remindResult: ''
		}
	},
	beforeMount: function() {
        this.$http.post('./getYearTermList',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.yearTerm = data.yearTerm;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
        this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.courseInfo = data.courseInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
    methods: {
    	// 查询按钮************************************************************************
    	findBtn: function () {
    		if (this.selGradeType == "选择年制") {
    			this.selGradeType = '0';
    		}
    		if (this.selYearTerm == "选择学期") {
    			this.selYearTerm = '';
    		}
    		if (this.selCourseName == "选择课程") {
    			this.selCourseName = '';
    		}
    		this.$http.post('./getMakeUpGradeInputList',{
				"gradeType": this.selGradeType,
				"yearTerm": this.selYearTerm,
				"courseId": this.selCourseName,
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.makeUpGradeInputList = data.makeUpGradeInputList;
                    if (this.makeUpGradeInputList != []) {
                    	this.buttonShow = true;
                    	this.submitShow = true;
                    }else {
                    	this.modalResult = true;
                    	this.remindResult = '6';
                    }
                }else {
                    // this.$Message.error('操作失败！请重试');
                    this.modalResult = true;
                    this.remindResult = '1';
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
    	// 编辑修改补考成绩*****************************************************************
    	compileBtn: function () {
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
    			input[i].readOnly = false;
    			input[i].style.border = "0.1rem solid #d4d4d9";
    		}
    	},
    	// 保存修改成绩**************************************************************************
    	saveAllBtn: function () {
    		this.modalOperation = true;
    		this.opertaionBool = '1';
    	},
    	saveOk: function () {
    		this.modalOperation = false;
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
    			input[i].readOnly = true;
    			input[i].style.border = "none";
    		}
    		this.$http.post('./saveMakeUpScore',{
    			"operateType": "1",
    			"gradeType": this.selGradeType,
				"yearTerm": this.selYearTerm,
				"courseId": this.selCourseName,
				"makeUpGradeInputList": this.makeUpGradeInputList
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.$Message.success('保存成功！');
                    // this.remindResult = '2';
                }else {
                    // this.$Message.error('操作失败！请重试');
	            	this.modalResult = true;
                    this.remindResult = '4';
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
    	// 提交补考成绩，提交后不可再修改***********************************************************
    	submitBtn: function () {
    		this.modalOperation = true;
    		this.opertaionBool = '2';
    	},
    	submitOk: function () {
    		this.modalOperation = false;
    		this.$http.post('./saveMakeUpScore',{
    			"operateType": "2",
    			"gradeType": this.selGradeType,
				"yearTerm": this.selYearTerm,
				"courseId": this.selCourseName,
				"makeUpGradeInputList": this.makeUpGradeInputList
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.$Message.success('提交成功！成绩将不可再修改。');
                    // this.remindResult = '3';
                    this.buttonShow = false;
                }else {
                    // this.$Message.error('操作失败！请重试');
                    this.modalResult = true;
                    this.remindResult = '5';
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
    	cancel: function () {
    		this.modalOperation = false;
    	},
    	resultOk: function () {
    		this.modalResult = false;
    	}
    }
}
</script>

<style scoped>
#makeupGradeInputBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.makeupScoreTable {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
.makeupScoreTable input {
	outline:none;
    border: none;
    margin: 0;
    text-align: center;
}

.rightBtn {
	float: right;
}
</style>