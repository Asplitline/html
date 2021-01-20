
((exports) => {
	'use strict';
	// 封装过滤函数
	let filters = {
		all(tasks) {
			return tasks;
		},
		active(tasks) {
			return tasks.filter(item => !item.status);
		},
		completed(tasks) {
			return tasks.filter(item => item.status);
		}
	}

	exports.app = new Vue({
		el: '.todoapp',
		data: {
			tasks: [],
			currentTask: null,
			filterStat: 'all',
			// 此处不能为空，不影响功能，渲染时会报错
			// Error in render: "TypeError: filters[this.filterStat] is not a function"
		},
		methods: {
			pluralize(word, count) {
				return count + " " + word + (count === 1 ? '' : 's');
			},
			addTask(evt) {
				let title = evt.target.value.trim();
				if (title.length) {
					this.tasks.push({
						id: Date.now(),
						title,
						status: false
					});
				}
				evt.target.value = '';
			},
			removeTask(index) {
				this.tasks.splice(index, 1);
			},
			editTask(item, index, evt) {
				this.currentTask = item;
				if (index != undefined) {
					this.currentTask = null;
					let title = evt.target.value.trim();
					if (!title.length) return this.tasks.splice(index, 1);
					item.title = title;
				}
			},
			removeAllDone() {
				this.tasks = this.tasks.filter(item => !item.status);
			}
		},
		computed: {
			toggleStat: {
				get() {
					return this.tasks.every(item => item.status);
				},
				set(val) {
					this.tasks.forEach(item => item.status = val);
				}
			},
			leftNum() {
				return this.tasks.filter(item => !item.status).length;
			},
			filterTask() {
				return filters[this.filterStat](this.tasks);
			},
		},

		watch: {
			tasks: {
				deep: true,
				handler: todoStorage.save
			}
		},

		directives: {
			autoFocus: {
				update(el, binding) {
					if (binding.value) {
						el.focus();
					}
				}
			}
		},
		mounted() {
			this.tasks = todoStorage.fetch();
		}
	});

	exports.onhashchange = function () {
		app.filterStat = location.hash.split('/')[1] || 'all';
	}


})(window);
