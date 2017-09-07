<template>
<div>
	<div class="blank">
		<div class="semester">当前学年学期：{{currentSemester}}</div>
	</div>

	<div id="setPriceBody">
		<div class="setPriceContent">
			<div>
				<button class="amButtom">
					<span class="subtitle">教学职称</span>
				</button>
				<img id="teacherArrow" class="iconImg" :src="icon2" style="position:absolute; left:6rem;">
				<button class="amButtom" @click="teacherClick()" style="background-color:#1fa573; cursor:pointer;">
					<span class="subtitle" style="left:2rem;">教师</span>
				</button>
				<table class="priceTable" width="100%" cellspacing="0" v-show="teacherTable">
					<thead>
						<tr>
							<th width="33%">职称</th>
							<th width="33%">课酬/课时</th>
							<th width="34%">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(teacherOne, index) in teacher" :id="'teacherInputTr'+index" :key="teacherOne">
							<td>{{teacherOne.jobName}}</td>
							<td>
								<input id="input1" type="text" :value="teacherOne.payPerCourse" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
							</td>
							<td class="operations" :value="teacherOne.jobtitleId">	<!-- :value="teacherOne.opts" -->
								<img :id="'teacherEditImg'+index" width="25px" height="25px" class="editImg" src="../../../public/images/edit.png" @click="editClick('teacher',index)">
				                <img :id="'teacherSaveImg'+index" width="25px" height="25px" class="saveImg" src="../../../public/images/save.png" @click="saveClick('teacher',index)">
				                <img :id="'teacherRestoreImg'+index" width="25px" height="25px" class="restoreImg" src="../../../public/images/restore.png" @click="restoreClick('teacher',index)">
				                <img :id="'teacherDeleteImg'+index" width="25px" height="25px" class="deleteImg" src="../../../public/images/delete.png" @click="deleteClick('teacher',index)">
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div>
				<button class="amButtom">
					<span class="subtitle">工作职称</span>
				</button>
				<img id="doctorArrow" class="iconImg" :src="icon1" style="position:absolute; left:6rem;">
				<button class="amButtom" @click="doctorClick()" style="background-color:#1fa573; cursor:pointer;">
					<span class="subtitle" style="left:2rem;">医生</span>
				</button>
				<table class="priceTable" width="100%" cellspacing="0" v-show="doctorTable">
					<thead>
						<tr>
							<th width="33%">职称</th>
							<th width="33%">课酬/课时</th>
							<th width="34%">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(doctorOne, index) in doctor" :id="'doctorInputTr'+index" :key="doctorOne">
							<td>{{doctorOne.jobName}}</td>
							<td>
								<input id="input1" type="text" :value="doctorOne.payPerCourse" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
							</td>
							<td class="operations" :value="doctorOne.jobtitleId">
								<img :id="'doctorEditImg'+index" width="25px" height="25px" class="editImg" src="../../../public/images/edit.png" @click="editClick('doctor',index)">
				                <img :id="'doctorSaveImg'+index" width="25px" height="25px" class="saveImg" src="../../../public/images/save.png" @click="saveClick('doctor',index)">
				                <img :id="'doctorRestoreImg'+index" width="25px" height="25px" class="restoreImg" src="../../../public/images/restore.png" @click="restoreClick('doctor',index)">
				                <img :id="'doctorDeleteImg'+index" width="25px" height="25px" class="deleteImg" src="../../../public/images/delete.png" @click="deleteClick('doctor',index)">
							</td>
						</tr>
					</tbody>
				</table>

				<img id="nurseArrow" class="iconImg" :src="icon1" style="position:absolute; left:6rem;">
				<button class="amButtom" @click="nurseClick()" style="background-color:#1fa573; cursor:pointer;">
					<span class="subtitle" style="left:2rem;">护士</span>
				</button>
				<table class="priceTable" width="100%" cellspacing="0" v-show="nurseTable">
					<thead>
						<tr>
							<th width="33%">职称</th>
							<th width="33%">课酬/课时</th>
							<th width="34%">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(nurseOne, index) in nurse" :id="'nurseInputTr'+index" :key="nurseOne">
							<td>{{nurseOne.jobName}}</td>
							<td>
								<input id="input1" type="text" :value="nurseOne.payPerCourse" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
							</td>
							<td class="operations" :value="nurseOne.jobtitleId">
								<img :id="'nurseEditImg'+index" width="25px" height="25px" class="editImg" src="../../../public/images/edit.png" @click="editClick('nurse',index)">
				                <img :id="'nurseSaveImg'+index" width="25px" height="25px" class="saveImg" src="../../../public/images/save.png" @click="saveClick('nurse',index)">
				                <img :id="'nurseRestoreImg'+index" width="25px" height="25px" class="restoreImg" src="../../../public/images/restore.png" @click="restoreClick('nurse',index)">
				                <img :id="'nurseDeleteImg'+index" width="25px" height="25px" class="deleteImg" src="../../../public/images/delete.png" @click="deleteClick('nurse',index)">
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<Modal v-model="modalOperation" id="modalBody" :styles="{top:'10rem'}">
			<div style="text-align:center; font-size:1.1rem;">
				<p v-if="opertaionBool === '1'">您确定要保存所修改内容吗？</p>
				<p v-else-if="opertaionBool === '2'">您确定要删除该职称课酬吗？</p>
				<p v-else-if="opertaionBool === '3'">您确定要不保存并退出编辑吗？</p>
			</div>
			<div slot="footer" style="text-align:center;">
				<Button v-if="opertaionBool === '1'" id="modalBtn" @click="saveOk()">确定</Button>
				<Button v-else-if="opertaionBool === '2'" id="modalBtn" @click="deleteOk()">确定</Button>
				<Button v-else-if="opertaionBool === '3'" id="modalBtn" @click="quitOk()">确定</Button>
				<Button id="modalBtn" @click="cancel()">取消</Button>
			</div>
		</Modal>

		<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
			<div style="text-align:center; font-size:1.1rem;">
			    <p v-if="remindResult === '1'">操作失败！请重试</p>
			    <p v-else-if= "remindResult === '2'">保存成功！</p>
			    <p v-else-if= "remindResult === '3'">保存失败！</p>
			    <p v-else-if= "remindResult === '4'">删除成功！</p>
			    <p v-else-if= "remindResult === '5'">删除失败！</p>
			    <p v-else-if= "remindResult === '6'">请输入课酬信息！</p>
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
			icon1: require('../../../../assets/images/icon1.png'),
        	icon2: require('../../../../assets/images/icon2.png'),
        	tchArrow: true,
        	teacherTable: true,
        	drArrow: false,
        	doctorTable: false,
        	nurArrow: false,
        	nurseTable: false,
			currentSemester: '',
			teacher: [{jobName: "aaa"}],
			doctor: [],
			nurse: [],
			jobtitleStrList: [],
			modalOperation: false,
			opertaionBool: '',
			modalResult: false,
			remindResult: '',
			type: '',
			index: ''
		}
	},
	beforeMount: function() {
        this.$http.post('./jobTitleManage/getJobtitleInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.currentSemester = data.currentSemester;
            this.jobtitleStrList = data.jobtitleStrList;
            // 从jobtitleStrList数组中获取出三个类型并分别放到三个数组中
            for (var i = 0; i < this.jobtitleStrList.length; i++) {
            	if (i<4) {
            		this.teacher.push(this.jobtitleStrList[i]);
            	}else if (i<8) {
            		this.doctor.push(this.jobtitleStrList[i]);
            	}else {
            		this.nurse.push(this.jobtitleStrList[i]);
            	}
            }
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 点击显示或隐藏教师的下拉表格信息
		teacherClick: function () {
			var teacherArrow = document.getElementById("teacherArrow");
			if (!this.tchArrow) {
				this.tchArrow = true;
				this.teacherTable = true;
				teacherArrow.src = this.icon2;
			}else {
				this.tchArrow = false;
				this.teacherTable = false;
				teacherArrow.src = this.icon1;
			}
		},
		// 点击显示或隐藏医生的下拉表格信息
		doctorClick: function () {
			var doctorArrow = document.getElementById("doctorArrow");
			if (!this.drArrow) {
				this.drArrow = true;
				this.doctorTable = true;
				doctorArrow.src = this.icon2;
			}else {
				this.drArrow = false;
				this.doctorTable = false;
				doctorArrow.src = this.icon1;
			}
		},
		// 点击显示或隐藏护士的下拉表格信息
		nurseClick: function () {
			var nurseArrow = document.getElementById("nurseArrow");
			if (!this.nurArrow) {
				this.nurArrow = true;
				this.nurseTable = true;
				nurseArrow.src = this.icon2;
			}else {
				this.nurArrow = false;
				this.nurseTable = false;
				nurseArrow.src = this.icon1;
			}
		},
		// 编辑功能
		editClick: function(type,index){
            var inputTr = document.getElementById(type+"InputTr"+index);
            var input = inputTr.getElementsByTagName("input");
            var editImg = document.getElementById(type+"EditImg"+index);
            var saveImg = document.getElementById(type+"SaveImg"+index);
            var restoreImg = document.getElementById(type+"RestoreImg"+index);
            var deleteImg = document.getElementById(type+"DeleteImg"+index);
            var i = null;
        	for(i = 0;i<input.length;i++){
                input[i].readOnly = false;
                input[i].style.border = "0.1rem solid #d4d4d9";
                input[i].value = "";
            }
			// 隐藏编辑和删除功能图标,显示保存和重置功能图标
            editImg.style.display = "none";
            saveImg.style.display = "inline";
            deleteImg.style.display = "none";
            restoreImg.style.display = "inline";
        },
        // 取消修改,重置数据,退出编辑
        restoreClick: function(type,index){
        	this.modalOperation = true;
        	this.opertaionBool = '3';
        	this.type = type;
        	this.index = index;
        },
        quitOk: function () {
        	this.modalOperation = false;
			var inputTr = document.getElementById(this.type+"InputTr"+this.index);
            var input = inputTr.getElementsByTagName("input");
            var editImg = document.getElementById(this.type+"EditImg"+this.index);
            var saveImg = document.getElementById(this.type+"SaveImg"+this.index);
            var restoreImg = document.getElementById(this.type+"RestoreImg"+this.index);
            var deleteImg = document.getElementById(this.type+"DeleteImg"+this.index);
            var i = null;
			// 重置数据到value,虽然input的value和data中的属性绑定,但并不是完全的双向,此时data中的属性数据并没有发生修改
            // input[0].value = this.jobtitleStrList[this.index].jobtitleId;
            // input[0].value = this.jobtitleStrList[this.index].jobName;
	        if (this.type == "teacher") {
	        	input[0].value = this.teacher[this.index].payPerCourse;
	        }else if (this.type == "doctor") {
	        	input[0].value = this.doctor[this.index].payPerCourse;
	        }else if (this.type == "nurse") {
	        	input[0].value = this.nurse[this.index].payPerCourse;
	        }
				// 使课程信息的输入标签变为不可输入，隐藏边框
	        for(i = 0;i<input.length;i++){
	            input[i].readOnly = true;
	            input[i].style.border = "none";
	        }
	          editImg.style.display = "inline";
	          saveImg.style.display = "none";
	          deleteImg.style.display = "inline";
	          restoreImg.style.display = "none";
	        this.modalResult = true;
	        this.remindResult = '3';
        },
        // 清除input中数据
        deleteClick: function(type,index){
        	this.modalOperation = true;
        	this.opertaionBool = '2';
        	this.type = type;
        	this.index = index;
        },
        deleteOk: function () {
        	this.modalOperation = false;
    		var inputTr = document.getElementById(this.type+"InputTr"+this.index);
            var input = inputTr.getElementsByTagName("input");
			this.$http.post('./jobTitleManage/deleteJobtitle',{
			    "jobtitleId": this.jobtitleStrList[this.index].jobtitleId
			},{
			    "Content-Type":"application/json"
			}).then(function(response){
			    console.log("通过申请:");
			    console.log(response);
			    var data = response.body;
			    this.modalResult = true;
			    if(data.result == "1") {
			        input[0].value = "";
			        this.remindResult = '4';
			    }else if (data.result == "0") {
			        // alert("操作失败！请重试");
			        this.remindResult = '5';
			    }
			},function(error){
			    console.log("通过申请error:");
			    console.log(error);
			});
        },
        // 保存功能
		saveClick: function(type,index){
			var inputTr = document.getElementById(type+"InputTr"+index);
            var input = inputTr.getElementsByTagName("input");
			if (input[0].value == "") {
				this.modalResult = true;
				this.remindResult = '6';
			}else {
				this.modalOperation = true;
	        	this.opertaionBool = '1';
	        	this.type = type;
	        	this.index = index;
			}
		},
		saveOk: function () {
			this.modalOperation = false;
			var inputTr = document.getElementById(type+"InputTr"+index);
            var input = inputTr.getElementsByTagName("input");
            var editImg = document.getElementById(type+"EditImg"+index);
            var saveImg = document.getElementById(type+"SaveImg"+index);
            var restoreImg = document.getElementById(type+"RestoreImg"+index);
            var deleteImg = document.getElementById(type+"DeleteImg"+index);
		    var i = null;
			// 保存数据到data,虽然input的value和data中的属性绑定,但并不是完成的双向,此时data中的属性数据并没有发生修改
			    // this.jobtitleStrList[index].jobtitleId = input[0].value;
			    // this.jobtitleStrList[index].jobName = input[0].value;
			if (type == "teacher") {
            	this.teacher[index].payPerCourse = input[0].value;
            }else if (type == "doctor") {
            	this.doctor[index].payPerCourse = input[0].value;
            }else if (type == "nurse") {
            	this.nurse[index].payPerCourse = input[0].value;
            }
			for(i = 0;i<input.length;i++){
			    input[i].readOnly = true;
			    input[i].style.border = "none";
			}
			// 预留功能,将data提交到后端,实现保存数据,处理回调
			  editImg.style.display = "inline";
			  saveImg.style.display = "none";
			  deleteImg.style.display = "inline";
			  restoreImg.style.display = "none";
			// 向后台提交数据
			// console.log(jobtitleId);
			this.$http.post('./jobTitleManage/editJobtitle',{
			    "jobtitleId": this.jobtitleStrList[index].jobtitleId,
			    "jobName": this.jobtitleStrList[index].jobName,
			    "payPerCourse": this.jobtitleStrList[index].payPerCourse
			},{
			    "Content-Type":"application/json"
			}).then(function(response){
				console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == 1) {
	            	this.jobtitleStrList = data.jobtitleStrList;
		        	window.location.reload();
		        	this.modalResult = true;
		        	this.remindResult = '2';
	            }
			},
			function(error){
			    console.log("通过申请error:");
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
.semester {
	margin: 0 5rem;
	float: right;
}

#setPriceBody {
	width: 100%;
	background-color: #ececec;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.setPriceContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
.setPriceContent img {
	cursor: pointer;
	/*width: 1.8rem;
	height: 1.8rem;
*/}

.setPriceContent input {
    text-align: center;
    border: 0;
}
.priceTable > tbody > tr > td {
	border-top: 1px solid #ddd;
} 
.priceTable > thead > tr > th,
.priceTable > thead > tr > td {
    padding: 0.4rem 0rem;
    line-height: 1.6rem;
}
.priceTable > tbody > tr > th,
.priceTable > tbody > tr > td {
	padding: 0.2rem 0rem;
    line-height: 1.2rem;
}

.operations img {
	padding: 0 1rem;
}
.saveImg, 
.restoreImg {
	display: none;
}
</style>