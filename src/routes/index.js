// *******************eduAdmin***********************************
// markManage
import adminCancelGrade from '../views/eduAdmin/markManage/adminCancelGradePage/adminCancelGradePage.vue'
import gradeQuery from '../views/eduAdmin/markManage/gradeQueryPage/gradeQueryPage.vue'
import gradeStat from '../views/eduAdmin/markManage/gradeStatPage/gradeStatPage.vue'
import makeupExamAdmin from '../views/eduAdmin/markManage/makeupExamAdminPage/makeupExamAdminPage.vue'
import makeupGradeInput from '../views/eduAdmin/markManage/makeupGradeInputPage/makeupGradeInputPage.vue'
// tchSalary
import salary from '../views/eduAdmin/tchSalary/salaryPage/salaryPage.vue'
import setPrice from '../views/eduAdmin/tchSalary/setPricePage/setPricePage.vue'
// userManage
import authorityMgmt1 from '../views/eduAdmin/userManage/authorityMgmt1Page/authorityMgmt1Page.vue'
// notice
import noticeManage from '../views/eduAdmin/notice/noticeMgmtPage/noticeManage.vue'
import noticeSetting from '../views/eduAdmin/notice/noticeSettingPage/noticeSetting.vue'
import notifyInformation from '../views/eduAdmin/notice/notifyInformationPage/notifyInformationPage.vue'

// *******************main***********************************
import eduAdminHomePage from '../views/main/eduAdminHomePage/eduAdminHomePage.vue'


// *******************teacher***********************************
import tchCheckTimetable from '../views/teacher/tchCheckTimetablePage/tchCheckTimetablePage.vue'
import courseList from '../views/teacher/courseListPage/courseListPage.vue'
import gradesInput from '../views/teacher/gradesInputPage/gradesInputPage.vue'
import normalSchedule from '../views/teacher/normalSchedulePage/normalSchedulePage.vue'
import tchGradesInput from '../views/teacher/tchGradesInputPage/tchGradesInputPage.vue'
import tchManuAdjCl from '../views/teacher/tchManuAdjClPage/tchManuAdjClPage.vue'
import tchCheckSalary from '../views/teacher/tchCheckSalaryPage/tchCheckSalaryPage.vue'


import viewPageList from '../viewPageList.vue'

const routers = [

	{
      path: '/',
      name: 'index',
      component: viewPageList
      //  首页
    },


	// 界面路径
	// main
	{
		// 首页
		path: '/main/eduAdminHomePage',
		name: 'eduAdminHomePage',
		component: eduAdminHomePage
	},


	//eduAdmin
	{
		// 教务-管理员撤销成绩
		path: '/eduAdmin/gradeManage/grade/adminCancelGrade',
		name: 'adminCancelGrade',
		component: adminCancelGrade
	},
	{
		// 教务-成绩查询（学号查询）
		path: '/eduAdmin/gradeManage/grade/gradeQuery',
		name: 'gradeQuery',
		component: gradeQuery
	},
	{
		// 教务-成绩统计（分数段查询）
		path: '/eduAdmin/gradeManage/grade/gradeStat',
		name: 'gradeStat',
		component: gradeStat
	},
	{
		// 教务-补考成绩管理
		path: '/eduAdmin/gradeManage/makeupExam/makeupExamAdmin',
		name: 'makeupExamAdmin',
		component: makeupExamAdmin
	},
	{
		// 教务-补考成绩输入
		path: '/eduAdmin/gradeManage/makeupExam/makeupGradeInput',
		name: 'makeupGradeInput',
		component: makeupGradeInput
	},
	{
		// 教务-薪酬单
		path: '/eduAdmin/emolument/salary',
		name: 'salary',
		component: salary
	},
	{
		// 教务-设置单价
		path: '/eduAdmin/emolument/setPrice',
		name: 'setPrice',
		component: setPrice
	},
	{
		// 教务-权限管理1（角色管理）
		path: '/eduAdmin/role/authorityMgmt1',
		name: 'authorityMgmt1',
		component: authorityMgmt1
	},
	{
		// 教务-公告管理
		path: '/eduAdmin/information/noticeManage',
		name: 'noticeManage',
		component: noticeManage
	},
	{
		// 教务-公告编辑
		path: '/eduAdmin/information/noticeSetting',
		name: 'noticeSetting',
		component: noticeSetting
	},
	{
		// 教务-公告详细
		path: '/eduAdmin/information/notifyInformation',
		name: 'notifyInformation',
		component: notifyInformation
	},



	// teacher
	{
		// 教师-查看教师课表
		path: '/teacher/classInfo/tchCheckTimetable',
		name: 'tchCheckTimetable',
		component: tchCheckTimetable
	},
	{
		// 教师-查看个人薪酬单
		path: '/teacher/classInfo/tchCheckSalary',
		name: 'tchCheckSalary',
		component: tchCheckSalary
	},
	{
		// 教师-教学计划
		path: '/teacher/teach/courseList',
		name: 'courseList',
		component: courseList
	},
	{
		// 教师-上课签到
		path: '/teacher/teach/normalSchedule',
		name: 'normalSchedule',
		component: normalSchedule
	},
	{
		// 教师-正考成绩输入
		path: '/teacher/class/gradesInput',
		name: 'gradesInput',
		component: gradesInput
	},
	{
		// 教师-成绩录入
		path: '/teacher/class/tchGradesInput',
		name: 'tchGradesInput',
		component: tchGradesInput
	},
	{
		// 教师-调课申请
		path: '/teacher/course/tchManuAdjCl',
		name: 'tchManuAdjCl',
		component: tchManuAdjCl
	}
]
export default routers