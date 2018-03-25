<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserTodoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('todo');
        Schema::create('todo', function(Blueprint $table){
            $table->date('date');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')
                  ->on('users')->onDelete('cascade');

            $table->string('title');

            $table->string('description')->nullable();

            $table->boolean('is_done');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('events_users');
    }
}
