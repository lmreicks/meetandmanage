<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GroupEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('group_events');
        Schema::create('group_events', function(Blueprint $table){
            $table->integer('group_id')->unsigned();
            $table->foreign('group_id')->references('id')
                  ->on('group');

            $table->integer('event_id')->unsigned();
            $table->foreign('event_id')->references('id')
                  ->on('events');

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
        Schema::drop('group_events');
    }
}
