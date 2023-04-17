import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateInitDb1681551923529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `
        CREATE TABLE \`admin_tenant\`  (
            \`id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '租户编号',
            \`name\` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '租户名',
            \`contact_user_id\` bigint(20) NULL DEFAULT NULL COMMENT '联系人的用户编号',
            \`contact_name\` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系人',
            \`contact_mobile\` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '联系手机',
            \`status\` tinyint(4) NOT NULL DEFAULT 0 COMMENT '租户状态（0正常 1停用）',
            \`domain\` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '绑定域名',
            \`package_id\` bigint(20) NOT NULL COMMENT '租户套餐编号',
            \`expire_time\` datetime(0) NOT NULL COMMENT '过期时间',
            \`account_count\` int(11) NOT NULL COMMENT '账号数量',
            \`creator\` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '创建者',
            \`create_time\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
            \`updater\` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '更新者',
            \`update_time\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
            \`deleted\` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
            PRIMARY KEY (\`id\`) USING BTREE
          ) ENGINE = InnoDB AUTO_INCREMENT = 150 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '租户表' ROW_FORMAT = Dynamic;                           
        `);


        await queryRunner.query(`
            CREATE TABLE \`system_users\`  (
                \`id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
                \`username\` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户账号',
                \`password\` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
                \`nickname\` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户昵称',
                \`remark\` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注',
                \`dept_id\` bigint(20) NULL DEFAULT NULL COMMENT '部门ID',
                \`post_ids\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '岗位编号数组',
                \`email\` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户邮箱',
                \`mobile\` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '手机号码',
                \`sex\` tinyint(4) NULL DEFAULT 0 COMMENT '用户性别',
                \`avatar\` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '头像地址',
                \`status\` tinyint(4) NOT NULL DEFAULT 0 COMMENT '帐号状态（0正常 1停用）',
                \`login_ip\` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '最后登录IP',
                \`login_date\` datetime(0) NULL DEFAULT NULL COMMENT '最后登录时间',
                \`creator\` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '创建者',
                \`create_time\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
                \`updater\` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '更新者',
                \`update_time\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
                \`deleted\` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
                \`tenant_id\` bigint(20) NOT NULL DEFAULT 0 COMMENT '租户编号',
                PRIMARY KEY (\`id\`) USING BTREE,
                UNIQUE INDEX \`idx_username\`(\`username\`, \`update_time\`, \`tenant_id\`) USING BTREE
              ) ENGINE = InnoDB AUTO_INCREMENT = 126 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;              
              `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`drop table system_tenant;`)
        queryRunner.query(`drop table system_users;`)
    }

}
