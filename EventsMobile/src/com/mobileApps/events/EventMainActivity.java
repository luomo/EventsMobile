package com.mobileApps.events;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class EventMainActivity extends DroidGap {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("splashscreen", R.drawable.ic_launcher);
		super.loadUrl("file:///android_asset/www/eventApp.html");
	}

}
