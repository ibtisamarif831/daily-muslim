import { eq, and } from "drizzle-orm";
import type { Database } from "./index";
import {
	users,
	tasks,
	prayers,
	type NewUser,
	type NewTask,
	type NewPrayer,
} from "./schema";

export class DatabaseService {
	constructor(private db: Database) {}

	// User operations
	async createUser(userData: NewUser) {
		const [user] = await this.db.insert(users).values(userData).returning();
		return user;
	}

	async getUserById(id: number) {
		const [user] = await this.db.select().from(users).where(eq(users.id, id));
		return user;
	}

	async getUserByEmail(email: string) {
		const [user] = await this.db
			.select()
			.from(users)
			.where(eq(users.email, email));
		return user;
	}

	// Task operations
	async createTask(taskData: NewTask) {
		const [task] = await this.db.insert(tasks).values(taskData).returning();
		return task;
	}

	async getUserTasks(userId: number) {
		return await this.db.select().from(tasks).where(eq(tasks.userId, userId));
	}

	async updateTaskCompletion(taskId: number, completed: boolean) {
		const [task] = await this.db
			.update(tasks)
			.set({ completed, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
			.returning();
		return task;
	}

	// Prayer operations
	async createPrayer(prayerData: NewPrayer) {
		const [prayer] = await this.db
			.insert(prayers)
			.values(prayerData)
			.returning();
		return prayer;
	}

	async getUserPrayersForDate(userId: number, date: string) {
		return await this.db
			.select()
			.from(prayers)
			.where(and(eq(prayers.userId, userId), eq(prayers.date, date)));
	}

	async updatePrayerCompletion(prayerId: number, completed: boolean) {
		const [prayer] = await this.db
			.update(prayers)
			.set({ completed })
			.where(eq(prayers.id, prayerId))
			.returning();
		return prayer;
	}
}
