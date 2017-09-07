<template>
<div>
	<div class="tableSelect">
	    <select v-model="course">
			<option disabled>选择课程</option>
			<option v-for="option1 in courseInfo" :value="option1.courseId">
				{{ option1.courseName }}
			</option>
	    </select>
	    <select v-model="teacher">
	    	<option disabled>选择教师</option>
			<option v-for="option2 in teacherInfo" :value="option2.teacherId">
				{{ option2.teacherName }}
			</option>
	    </select>
		<button class="am-btn am-btn-success am-radius" @click="checkTableBtn()">查询</button>
	    <!-- <Modal v-model="modal" id="modalBody" :styles="{top:'10rem'}">
			<p style="text-align:center; font-size:1.1rem;">您确定要提交查看所有信息吗？</p>
			<div slot="footer" style="text-align:center;">
				<Button id="modalBtn" @click="ok()">确定</Button>
				<Button id="modalBtn" @click="cancel()">取消</Button>
			</div>
		</Modal> -->
	</div>
	<div id="cancelContent">
		<div class="cancelContentBody">
			<table class="operationTable">
				<thead>
					<tr>
						<th width="14%">课程编号</th>
						<th width="14%">课程名称</th>
						<th width="14%">教师编号</th>
						<th width="14%">上传教师</th>
						<th width="14%">班级</th>
						<th width="16%">上传时间</th>
						<th width="14%">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in scoreCommitList" :key="data">
						<td v-text="data.courseId"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.teacherId"></td>
						<td v-text="data.teacherName"></td>
						<td v-text="data.classId"></td>
						<td v-text="data.commitTime"></td>
						<td class="textBtn">
							<a @click="backoutClick(index)">撤销</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">操作失败！请重试</p>
		    <p v-if="remindResult === '2'">未找到所查询内容！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	        <!-- <Button id="modalBtn" @click="submitCancel()">取消</Button> -->
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	data () {
		return {
			course: '选择课程',
			teacher: '选择教师',
			courseInfo: [],
			teacherInfo: [],
			scoreCommitList: [
				{courseId: '010203', courseName: '护理学', teacherId: '010203', teacherName: '何平', commitTime: '06.01.23 12:55', classId: '01020'},
				{courseId: '010203', courseName: '基础护理学', teacherId: '010203', teacherName: '何平', commitTime: '06.01.23 12:55', classId: '未查看'}
			],
			// modal: false,		// 提交弹出框
			modalResult: false,
			remindResult: ''
		}
	},
	beforeMount: function () {
		this.$http.post('./courseManage/getCourseAndClassInfo',{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.courseInfo = data.courseInfo;
            this.teacherInfo = data.teacherInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
		// this.$http.post('./getScoreCommitted',{
  //           "Content-Type":"application/json"
  //       }).then(function(response){
  //           console.log("获取申请:");
  //           console.log(response.body);
  //           var data = response.body;
  //           this.scoreUnloadList = data.scoreUnloadList;
  //       },function(error){
  //           console.log("获取申请error:");
  //           console.log(error);
  //       });
	},
  	methods: {
  		// 点击查询，回调表单************************************************
  		checkTableBtn: function () {
  			if (this.course == "选择课程") {
  				this.course = '';
  			}
  			if (this.teacher == "选择教师") {
  				this.teacher = '';
  			}
  			this.$http.post('./getScoreCommitted', {
  				"courseId": this.course,
  				"teacherId": this.teacher
  			}, {
  				"Content-Type":"application/json"
  			}).then(function(response){
  				console.log("通过申请:");
                console.log(response);
                var data = response.body;
                if(data.scoreCommitList != []) {
                    this.scoreCommitList = data.scoreCommitList;
                }else{
                    // this.$Message.error("操作失败！请重试");
                    this.modalResult = true;
                    this.remindResult = '2';
                }
  			});
  		},
  		// 点击提交，列表所有数据已查看*************************************
  		// ok () {
    //         this.modal = false;
    //         this.$Message.success('提交成功！所有成绩信息已查看。');
    //         for (var i = 0; i < this.scoreCommitList.length; i++) {
    //         	this.scoreCommitList[i].check = "已通过";
    //         }
    //     },
    //     cancel () {
    //         this.modal = false;
    //         this.$Message.error('提交失败！请重新操作。');
    //     },
  		// 撤销该条信息，在列表中清除********************************************
  		backoutClick: function (index) {
  			// alert(this.scoreCommitList[index].courseId);
  			this.$http.post('./cancelScoreCommitted', {
  				"courseId": this.scoreCommitList[index].courseId,
  				"teacherId": this.scoreCommitList[index].teacherId,
  				"classId": this.scoreCommitList[index].classId
  			}, {
  				"Content-Type":"application/json"
  			}).then(function(response){
  				console.log("通过申请:");
                console.log(response);
                var data = response.body;
                if(data.result == "1") {
                    var r = confirm("是否撤销成绩提交？")
					if (r==true) {
						this.$Message.success("已撤回！");
						this.scoreCommitList.splice(index,1);
					}
                }else{
                    // this.$Message.error("操作失败！请重试");
                    this.modalResult = true;
                    this.remindResult = '1';
                }
  			});
  		},
    	resultOk: function () {
    		this.modalResult = false;
    	}
  	}
}


</script>

<style scoped>
#cancelContent {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.cancelContentBody {
	padding: 1rem 5rem;
}
.cancelContentBody table {
	width: 100%;
	/*margin-bottom: 1.6rem;*/
	/*padding: 0.5rem 0.5rem;*/
	border-spacing: 0;
	border-collapse: separate;
	background: white;
}
.cancelContentBody button {
	width:  5.6rem;
}
</style>
