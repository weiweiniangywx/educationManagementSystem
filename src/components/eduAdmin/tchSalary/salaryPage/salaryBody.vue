<template>
<div>
	<div class="tableSelect">
      	<select v-model="selTeacher">
			<option disabled>选择教师</option>
			<option v-for="teacherListOne in teacherInfo" :value="teacherListOne.teacherId">{{teacherListOne.teacherName}}</option>
		</select>
      	<button class="am-btn am-btn-success am-radius" @click="searchBtn()">查询</button>
      	<!-- <button class="am-btn am-btn-success am-radius" @click="exportTemplateBtn()">下载模板</button> -->
      	<button class="am-btn am-btn-success am-radius rightBtn" @click="exportBtn()">导出</button>
      	<!-- <button class="am-btn am-btn-success am-radius buttonPart" @click="inportBtn()">导入</button> -->
    </div>

	<div id="salaryBody">
		<div class="salaryContent">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="">教师编码</th>
						<th width="">教师姓名</th>
						<th width="">职称</th>
						<th width="">所授课程</th>
						<th width="">课时</th>
						<th width="">课酬/课时</th>
						<th width="">总课酬</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in teacherPayrollList">
						<td v-text="data.teacherId"></td>
						<td v-text="data.teacherName"></td>
						<td>{{data.workUnit}}  {{data.workDuty}}</td>
						<td>{{data.courseName}}({{data.courseId}})</td>
						<td v-text="data.courseHours"></td>
						<!-- <td class="textBtn"><a @click="periodBtn">{{data.period}}</a></td> -->
						<td v-text="data.payPerCourse"></td>
						<td v-text="data.wage"></td>
					</tr>
				</tbody>
			</table>
		</div>
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
</template>

<script>
export default {
	name: 'salaryBody',
	data () {
		return {
			selTeacher: '选择教师',
			teacherInfo: [],
			teacherPayrollList: [],
			modalResult: false
		}
	},
	beforeMount: function() {
        this.$http.post('./checkSalaryByEdu',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teacherPayrollList = data.allteacherPayrollList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
        // 获取下拉框教师列表
        this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teacherInfo = data.teacherInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 查询按钮
		searchBtn: function () {
    		if (this.selTeacher == "选择年制") {
    			this.selTeacher = '';
    		}
			this.$http.post('./checkSalaryByTeacher',{
				"teacherId": this.selTeacher
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.teacherPayrollList = data.teacherPayrollList;
                }else {
					this.modalResult = true;
                    // this.$Message.error('操作失败！请重试');
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
	    },
	    // 下载按钮
	    exportBtn: function () {
	    	location.href = "./downloadallSalaryList"
	    },
	    resultOk: function () {
	    	this.modalResult = false;
	    }
	}
}
</script>

<style scoped>
#salaryBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.salaryContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
#salary input {
  margin-right: 1.4rem;
}
.buttonPart {
  float: right;
}

</style>