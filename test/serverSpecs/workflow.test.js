/**
 * Created by den on 08.02.16.
 */
require('../../config/development');

var request = require('supertest');
var expect = require('chai').expect;
var url = 'http://localhost:8089/';
var host = process.env.HOST;
var aggent;

describe("Workflow Specs", function () {

    'use strict';
    var id;

    describe("Workflow with admin", function () {

        before(function (done) {
            aggent = request.agent(url);

            aggent
                .post('users/login')
                .send({
                    login: 'admin',
                    pass : '1q2w3eQWE',
                    dbId : 'production'
                })
                .expect(200, done);
        });

        after(function (done) {
            aggent
                .get('logout')
                .expect(302, done);
        });

        it("should create workflow", function (done) {
            var body = {
                name: "testWorkflow_7"
            };
            aggent
                .post('workflows')
                .send(body)
                .expect(201)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object);
                    expect(body)
                        .to.have.property('success');
                    expect(body)
                        .to.have.property('createdModel');

                    id = body.createdModel._id;
                    done();
                });
        });

        it("should update workflow", function (done) {
            var body = {
                name: "testWorkflow_8"
            };
            aggent
                .put('workflows/' + id)
                .send(body)
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object);
                    expect(body)
                        .to.have.property('success');

                    done();
                });
        });

        it("should delete workflow", function (done) {
            aggent
                .delete('workflows/' + id)
                .expect(200, done);
        });
    });

    describe("Workflow with user without a license", function () {

        before(function (done) {
            aggent = request.agent(url);

            aggent
                .post('users/login')
                .send({
                    login: 'ArturMyhalko',
                    pass : 'thinkmobiles2015',
                    dbId : 'production'
                })
                .expect(200, done);
        });

        after(function (done) {
            aggent
                .get('logout')
                .expect(302, done);
        });

    });
});